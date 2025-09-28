import React, { useState, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Alert,
  Chip,
  Collapse
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Lightbulb,
  VolumeUp,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { Exercise as ExerciseData } from '../data/lessons';

interface ExerciseProps {
  exercise: ExerciseData;
  onComplete: (exerciseId: string, isCorrect: boolean, timeTaken: number) => void;
  showHints?: boolean;
  allowRetry?: boolean;
}

const Exercise: React.FC<ExerciseProps> = ({
  exercise,
  onComplete,
  showHints = true,
  allowRetry = true
}) => {
  const { t } = useTranslation();
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime] = useState<number>(Date.now());
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = useCallback(() => {
    const timeTaken = Date.now() - startTime;
    const correct = userAnswer.toLowerCase().trim() === exercise.answer.toLowerCase().trim();

    setIsSubmitted(true);
    setIsCorrect(correct);
    setShowExplanation(true);
    setAttempts(prev => prev + 1);

    onComplete(exercise.id, correct, timeTaken);
  }, [userAnswer, exercise.answer, exercise.id, onComplete, startTime]);

  const handleRetry = useCallback(() => {
    setUserAnswer('');
    setIsSubmitted(false);
    setIsCorrect(null);
    setShowExplanation(false);
    setShowHint(false);
  }, []);

  const handlePronunciation = useCallback(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(exercise.question.includes('toki pona') ?
        exercise.question : exercise.answer);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  }, [exercise.question, exercise.answer]);

  const renderExerciseInput = () => {
    switch (exercise.type) {
      case 'multiple-choice':
        return (
          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            >
              {exercise.options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled={isSubmitted}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case 'fill-blank':
        return (
          <TextField
            fullWidth
            placeholder={t('exercises.enterAnswer')}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={isSubmitted}
            onKeyPress={(e) => e.key === 'Enter' && !isSubmitted && handleSubmit()}
          />
        );

      case 'translate-to-tp':
      case 'translate-to-en':
      case 'writing':
        return (
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder={t('exercises.enterTranslation')}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={isSubmitted}
          />
        );

      case 'pronunciation':
        return (
          <Box>
            <TextField
              fullWidth
              placeholder={t('exercises.enterPronunciation')}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={isSubmitted}
              onKeyPress={(e) => e.key === 'Enter' && !isSubmitted && handleSubmit()}
            />
            <Box mt={1}>
              <Button
                startIcon={<VolumeUp />}
                onClick={handlePronunciation}
                size="small"
                variant="outlined"
              >
                {t('exercises.playAudio')}
              </Button>
            </Box>
          </Box>
        );

      default:
        return (
          <TextField
            fullWidth
            placeholder={t('exercises.enterAnswer')}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={isSubmitted}
            onKeyPress={(e) => e.key === 'Enter' && !isSubmitted && handleSubmit()}
          />
        );
    }
  };

  const getExerciseTypeColor = (type: string) => {
    const colors = {
      'translate-to-tp': 'primary',
      'translate-to-en': 'secondary',
      'multiple-choice': 'info',
      'fill-blank': 'warning',
      'pronunciation': 'success',
      'writing': 'error'
    } as const;
    return colors[type as keyof typeof colors] || 'default';
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
      <Box mb={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Chip
            label={exercise.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            color={getExerciseTypeColor(exercise.type)}
            size="small"
          />
          {attempts > 0 && (
            <Typography variant="caption" color="text.secondary">
              {t('exercises.attempts', { count: attempts })}
            </Typography>
          )}
        </Box>

        <Typography variant="h6" gutterBottom>
          {exercise.question}
        </Typography>
      </Box>

      {renderExerciseInput()}

      <Box mt={3} display="flex" gap={1} alignItems="center" flexWrap="wrap">
        {!isSubmitted ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
          >
            {t('exercises.submit')}
          </Button>
        ) : (
          <>
            {allowRetry && !isCorrect && (
              <Button
                variant="outlined"
                onClick={handleRetry}
              >
                {t('exercises.retry')}
              </Button>
            )}
            <Button
              variant="contained"
              color={isCorrect ? 'success' : 'error'}
              startIcon={isCorrect ? <CheckCircle /> : <Cancel />}
              disabled
            >
              {isCorrect ? t('exercises.correct') : t('exercises.incorrect')}
            </Button>
          </>
        )}

        {showHints && exercise.hint && !showHint && !isSubmitted && (
          <Button
            startIcon={<Lightbulb />}
            onClick={() => setShowHint(true)}
            size="small"
            color="info"
          >
            {t('exercises.showHint')}
          </Button>
        )}
      </Box>

      {showHint && exercise.hint && (
        <Box mt={2}>
          <Alert severity="info" icon={<Lightbulb />}>
            <Typography variant="body2">
              <strong>{t('exercises.hint')}:</strong> {exercise.hint}
            </Typography>
          </Alert>
        </Box>
      )}

      {isSubmitted && (
        <Box mt={2}>
          <Alert severity={isCorrect ? 'success' : 'error'}>
            <Typography variant="body2">
              <strong>{t('exercises.answer')}:</strong> {exercise.answer}
            </Typography>
          </Alert>

          {exercise.explanation && (
            <Box mt={1}>
              <Button
                size="small"
                onClick={() => setShowExplanation(!showExplanation)}
                endIcon={showExplanation ? <ExpandLess /> : <ExpandMore />}
              >
                {t('exercises.explanation')}
              </Button>
              <Collapse in={showExplanation}>
                <Box mt={1}>
                  <Alert severity="info">
                    <Typography variant="body2">
                      {exercise.explanation}
                    </Typography>
                  </Alert>
                </Box>
              </Collapse>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default Exercise;