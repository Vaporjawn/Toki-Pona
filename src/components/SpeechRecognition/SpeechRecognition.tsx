import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  Fade,
} from '@mui/material';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  VolumeUp as VolumeUpIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

interface SpeechRecognitionProps {
  targetText: string;
  targetLanguage?: 'tp' | 'en'; // Toki Pona or English
  onResult: (transcript: string, confidence: number, isMatch: boolean) => void;
  onError?: (error: string) => void;
  showTargetText?: boolean;
  enabled?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const webkitSpeechRecognition: any;

const SpeechRecognition: React.FC<SpeechRecognitionProps> = ({
  targetText,
  targetLanguage = 'tp',
  onResult,
  onError,
  showTargetText = true,
  enabled = true,
}) => {
  const { t } = useTranslation();

  // Speech recognition state
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recognition, setRecognition] = useState<any>(null);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [lastResult, setLastResult] = useState<{
    transcript: string;
    isMatch: boolean;
    confidence: number;
  } | null>(null);

  // Text-to-Speech for playback
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Check if transcript matches target text
  const checkMatch = useCallback((transcript: string, target: string): boolean => {
    const normalizeText = (text: string) =>
      text.toLowerCase().replace(/[^\w\s]/g, '').trim();

    const normalizedTranscript = normalizeText(transcript);
    const normalizedTarget = normalizeText(target);

    // Exact match
    if (normalizedTranscript === normalizedTarget) {
      return true;
    }

    // Fuzzy match for Toki Pona (allow some flexibility)
    if (targetLanguage === 'tp') {
      const words1 = normalizedTranscript.split(/\s+/);
      const words2 = normalizedTarget.split(/\s+/);

      // If lengths are different, not a match
      if (words1.length !== words2.length) {
        return false;
      }

      // Check word-by-word similarity
      let matchedWords = 0;
      for (let i = 0; i < words1.length; i++) {
        if (words1[i] === words2[i] ||
            levenshteinDistance(words1[i], words2[i]) <= 1) {
          matchedWords++;
        }
      }

      // Consider it a match if 80% of words match
      return matchedWords / words1.length >= 0.8;
    }

    return false;
  }, [targetLanguage]);

  // Simple Levenshtein distance calculation
  const levenshteinDistance = (a: string, b: string): number => {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }

    return matrix[b.length][a.length];
  };

  // Initialize speech recognition
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
      onError?.('Speech recognition is not supported in this browser');
      return;
    }

    setIsSupported(true);
    const recognitionInstance = new SpeechRecognitionAPI();

    // Configure recognition
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 3;

    // Set language based on target
    recognitionInstance.lang = targetLanguage === 'en' ? 'en-US' : 'en-US'; // Use English for Toki Pona too

    // Event handlers
    recognitionInstance.onstart = () => {
      setIsRecording(true);
      setCurrentTranscript('');
      setLastResult(null);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognitionInstance.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript.trim().toLowerCase();

        if (result.isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setCurrentTranscript(finalTranscript || interimTranscript);

      if (finalTranscript) {
        const confidence = event.results[event.results.length - 1][0].confidence || 0;
        const isMatch = checkMatch(finalTranscript, targetText);

        setLastResult({ transcript: finalTranscript, isMatch, confidence });
        onResult(finalTranscript, confidence, isMatch);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognitionInstance.onerror = (event: any) => {
      setIsRecording(false);
      const errorMessage = `Speech recognition error: ${event.error}`;
      console.error(errorMessage);
      onError?.(errorMessage);
    };

    recognitionInstance.onend = () => {
      setIsRecording(false);
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.abort();
      }
    };
  }, [targetText, targetLanguage, onResult, onError, checkMatch]);

  // Start/stop recording
  const toggleRecording = () => {
    if (!recognition || !enabled) return;

    if (isRecording) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        onError?.('Failed to start speech recognition');
      }
    }
  };

  // Text-to-Speech playback
  const speakTargetText = () => {
    if (!window.speechSynthesis || isSpeaking) return;

    const utterance = new SpeechSynthesisUtterance(targetText);
    utterance.lang = targetLanguage === 'en' ? 'en-US' : 'en-US'; // Use English voice for both
    utterance.rate = 0.8; // Slightly slower for learning
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) {
    return (
      <Paper sx={{ p: 3 }}>
        <Alert severity="warning">
          <Typography>{t('audio.speechNotSupported', 'Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.')}</Typography>
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
      {/* Target text display */}
      {showTargetText && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            {t('audio.targetText', 'Target Text:')}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            {targetText}
          </Typography>
          <Button
            variant="outlined"
            startIcon={isSpeaking ? <CircularProgress size={16} /> : <VolumeUpIcon />}
            onClick={speakTargetText}
            disabled={isSpeaking || !enabled}
          >
            {t('audio.listen', 'Listen')}
          </Button>
        </Box>
      )}

      {/* Recording interface */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant={isRecording ? "contained" : "outlined"}
          color={isRecording ? "error" : "primary"}
          size="large"
          startIcon={isRecording ? <MicOffIcon /> : <MicIcon />}
          onClick={toggleRecording}
          disabled={!enabled}
          sx={{
            minWidth: 200,
            height: 60,
            fontSize: '1.1rem',
            ...(isRecording && {
              animation: 'pulse 1.5s infinite',
            }),
          }}
        >
          {isRecording ? t('audio.stopRecording', 'Stop Recording') : t('audio.startRecording', 'Start Recording')}
        </Button>
      </Box>

      {/* Current transcript */}
      {isRecording && currentTranscript && (
        <Fade in={true}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" color="text.secondary">
              {t('audio.listening', 'Listening...')}
            </Typography>
            <Typography variant="h6" sx={{ minHeight: '2em' }}>
              {currentTranscript}
            </Typography>
          </Box>
        </Fade>
      )}

      {/* Last result */}
      {lastResult && (
        <Fade in={true}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
              {lastResult.isMatch ? (
                <CheckCircleIcon color="success" />
              ) : (
                <ErrorIcon color="error" />
              )}
              <Typography
                variant="h6"
                color={lastResult.isMatch ? 'success.main' : 'error.main'}
                sx={{ fontWeight: 'bold' }}
              >
                {lastResult.isMatch ? t('audio.correct', 'Correct!') : t('audio.tryAgain', 'Try Again')}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {t('audio.youSaid', 'You said: "{{transcript}}"', { transcript: lastResult.transcript })}
            </Typography>
            <Chip
              label={t('audio.confidence', 'Confidence: {{confidence}}%', {
                confidence: Math.round(lastResult.confidence * 100)
              })}
              size="small"
              variant="outlined"
              sx={{ mt: 1 }}
            />
          </Box>
        </Fade>
      )}

      {/* Instructions */}
      <Typography variant="body2" color="text.secondary">
        {t('audio.instructions', 'Click the microphone button and speak the target text clearly.')}
      </Typography>

      {/* CSS for pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(244, 67, 54, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(244, 67, 54, 0);
            }
          }
        `}
      </style>
    </Paper>
  );
};

export default SpeechRecognition;