import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Card,
  CardContent,
  TextField,
  Chip,
  Stack,
  Alert,
  Fade,
  Collapse,
  Paper,
} from '@mui/material';
import {
  Timer as TimerIcon,
  Refresh as RefreshIcon,
  EmojiEvents as TrophyIcon,
  Speed as SpeedIcon,
  Bolt as BoltIcon,
  Mic,
  MicOff,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../../hooks/useProgress';
import type { Lesson } from '../../data/lessons';
import SpeechRecognition from '../SpeechRecognition/SpeechRecognition';

interface SpeedStats {
  totalAnswered: number;
  correctAnswers: number;
  xpEarned: number;
  timeSpent: number;
  averageResponseTime: number;
  streak: number;
  maxStreak: number;
}

interface SpeedPracticeSessionProps {
  lesson: Lesson;
  onExit: () => void;
  onComplete?: (lessonId: string, stats: SpeedStats) => void;
  timeLimit?: number; // in seconds, default 60
}

const SpeedPracticeSession: React.FC<SpeedPracticeSessionProps> = ({
  lesson,
  onExit,
  onComplete,
  timeLimit = 60
}) => {
  const { t } = useTranslation();
  const { dispatch } = useProgress();

  const shuffledExercises = useMemo(() => {
    return lesson.exercises
      .filter(ex => ex.type === 'translate-to-tp' || ex.type === 'translate-to-en' || ex.type === 'multiple-choice')
      .map(exercise => ({ exercise, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ exercise }) => exercise);
  }, [lesson.exercises]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [currentStreak, setCurrentStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(false);

  const [speedStats, setSpeedStats] = useState<SpeedStats>({
    totalAnswered: 0,
    correctAnswers: 0,
    xpEarned: 0,
    timeSpent: 0,
    averageResponseTime: 0,
    streak: 0,
    maxStreak: 0
  });

  const startTime = useMemo(() => Date.now(), []);

  // Start practice session
  useEffect(() => {
    dispatch({
      type: 'START_PRACTICE_SESSION',
      payload: {
        type: 'speedPractice',
        startedAt: new Date(),
        totalQuestions: shuffledExercises.length,
        timeSpent: 0,
        vocabulary: shuffledExercises.map(ex => ex.question)
      }
    });
  }, [dispatch, shuffledExercises]);

  const handleStart = useCallback(() => {
    setIsRunning(true);
    setQuestionStartTime(Date.now());
  }, []);

  const handleComplete = useCallback(() => {
    const totalTime = Date.now() - startTime;
    const finalStats = {
      ...speedStats,
      timeSpent: totalTime
    };

    setIsCompleted(true);
    setIsRunning(false);

    // Complete practice session
    dispatch({
      type: 'COMPLETE_PRACTICE_SESSION',
      payload: { xpEarned: finalStats.xpEarned }
    });

    onComplete?.(lesson.id.toString(), finalStats);
  }, [speedStats, startTime, dispatch, lesson.id, onComplete]);

  // Timer countdown effect
  useEffect(() => {
    if (isRunning && timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      handleComplete();
    }
  }, [isRunning, timeLeft, isCompleted, handleComplete]);

  const checkAnswer = useCallback((answer: string, correctAnswer: string): boolean => {
    return answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
  }, []);

  const handleSubmit = useCallback(() => {
    if (!userAnswer.trim() || !isRunning) return;

    const responseTime = Date.now() - questionStartTime;
    const currentExercise = shuffledExercises[currentIndex];
    const isCorrect = checkAnswer(userAnswer, currentExercise.answer);

    // Calculate XP with speed bonuses and streak multipliers
    let xpGained = 0;
    if (isCorrect) {
      xpGained = 10; // Base XP

      // Speed bonus (faster = more XP)
      if (responseTime < 3000) xpGained += 5; // Under 3 seconds
      else if (responseTime < 5000) xpGained += 3; // Under 5 seconds

      // Streak bonus
      const newStreak = currentStreak + 1;
      if (newStreak >= 5) xpGained += Math.floor(newStreak / 5) * 2; // +2 XP per 5-streak

      setCurrentStreak(newStreak);
    } else {
      setCurrentStreak(0);
    }

    // Update stats
    setSpeedStats(prev => {
      const newTotalAnswered = prev.totalAnswered + 1;
      const newCorrectAnswers = prev.correctAnswers + (isCorrect ? 1 : 0);
      const newTotalResponseTime = prev.averageResponseTime * prev.totalAnswered + responseTime;

      return {
        totalAnswered: newTotalAnswered,
        correctAnswers: newCorrectAnswers,
        xpEarned: prev.xpEarned + xpGained,
        timeSpent: prev.timeSpent + responseTime,
        averageResponseTime: newTotalResponseTime / newTotalAnswered,
        streak: currentStreak + (isCorrect ? 1 : 0),
        maxStreak: Math.max(prev.maxStreak, isCorrect ? currentStreak + 1 : prev.maxStreak)
      };
    });

    // Show feedback
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);

    // Auto-advance after brief feedback
    setTimeout(() => {
      setShowFeedback(false);
      if (currentIndex < shuffledExercises.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setUserAnswer('');
        setQuestionStartTime(Date.now());
      } else {
        // Restart with new shuffled exercises
        setCurrentIndex(0);
        setUserAnswer('');
        setQuestionStartTime(Date.now());
      }
    }, 1000);
  }, [userAnswer, isRunning, questionStartTime, shuffledExercises, currentIndex, checkAnswer, currentStreak]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setUserAnswer('');
    setTimeLeft(timeLimit);
    setIsRunning(false);
    setIsCompleted(false);
    setCurrentStreak(0);
    setShowFeedback(false);
    setSpeedStats({
      totalAnswered: 0,
      correctAnswers: 0,
      xpEarned: 0,
      timeSpent: 0,
      averageResponseTime: 0,
      streak: 0,
      maxStreak: 0
    });
  }, [timeLimit]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !showFeedback) {
      handleSubmit();
    }
  }, [handleSubmit, showFeedback]);

  const currentExercise = shuffledExercises[currentIndex];
  const progress = (timeLimit - timeLeft) / timeLimit * 100;
  const accuracy = speedStats.totalAnswered > 0
    ? (speedStats.correctAnswers / speedStats.totalAnswered) * 100
    : 0;

  // Pronunciation practice handlers
  const handlePronunciationResult = useCallback((_transcript: string, confidence: number, isMatch: boolean) => {
    if (isMatch && confidence > 0.6) {
      // Auto-fill the answer for speed practice
      setUserAnswer(currentExercise.answer);
      // Optionally auto-submit for even faster practice
      setTimeout(() => {
        if (!showFeedback) {
          handleSubmit();
        }
      }, 500);
    }
  }, [currentExercise.answer, showFeedback, handleSubmit]);

  const handleTogglePronunciation = useCallback(() => {
    setShowPronunciation(prev => !prev);
  }, []);

  if (isCompleted) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Card>
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <TrophyIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              {t('practice.speed_complete', 'Speed Practice Complete!')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {t('practice.blazing_speed', 'You practiced at blazing speed!')}
            </Typography>

            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">
                  {t('practice.questions_answered', 'Questions Answered')}:
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {speedStats.totalAnswered}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">
                  {t('practice.accuracy', 'Accuracy')}:
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {Math.round(accuracy)}%
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">
                  {t('practice.max_streak', 'Max Streak')}:
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="warning.main">
                  {speedStats.maxStreak}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">
                  {t('practice.avg_response_time', 'Avg Response Time')}:
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {speedStats.averageResponseTime > 0 ? (speedStats.averageResponseTime / 1000).toFixed(1) : 0}s
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">
                  {t('practice.xp_earned', 'XP Earned')}:
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="primary.main">
                  +{speedStats.xpEarned}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="outlined"
                onClick={handleRestart}
                startIcon={<RefreshIcon />}
              >
                {t('practice.try_again', 'Try Again')}
              </Button>
              <Button
                variant="contained"
                onClick={onExit}
              >
                {t('practice.finish', 'Finish')}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (!currentExercise) {
    return (
      <Alert severity="error">
        {t('practice.no_speed_exercises', 'No speed exercises available for this lesson.')}
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SpeedIcon color="primary" />
          {t('practice.speed_practice', 'Speed Practice')}
        </Typography>
        <Button variant="outlined" onClick={onExit}>
          {t('common.exit', 'Exit')}
        </Button>
      </Box>

      {/* Timer and Progress */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TimerIcon color={timeLeft <= 10 ? 'error' : 'primary'} />
            <Typography
              variant="h6"
              color={timeLeft <= 10 ? 'error.main' : 'primary.main'}
              fontWeight="bold"
            >
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {Math.round(progress)}% {t('practice.time_used', 'Time Used')}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          color={timeLeft <= 10 ? 'error' : 'primary'}
        />
      </Box>

      {/* Start Screen */}
      {!isRunning && !isCompleted && (
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <BoltIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              {t('practice.speed_challenge', 'Speed Challenge!')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {t('practice.speed_instructions', 'Answer as many questions as you can in')} {timeLimit} {t('practice.seconds', 'seconds')}!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              • {t('practice.faster_more_xp', 'Faster answers = more XP')}
              <br />
              • {t('practice.streak_bonus', 'Build streaks for bonus XP')}
              <br />
              • {t('practice.press_enter', 'Press Enter to submit answers')}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleStart}
              startIcon={<BoltIcon />}
            >
              {t('practice.start_speed_practice', 'Start Speed Practice')}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Question Card */}
      {isRunning && (
        <Card sx={{ mb: 3, position: 'relative' }}>
          {showFeedback && (
            <Fade in={showFeedback}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: lastAnswerCorrect ? 'success.light' : 'error.light',
                  color: 'white',
                  zIndex: 10,
                  borderRadius: 1
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {lastAnswerCorrect ? t('practice.correct', 'Correct!') : t('practice.incorrect', 'Incorrect!')}
                </Typography>
              </Box>
            </Fade>
          )}

          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom color="primary.main">
              {currentExercise.type === 'translate-to-tp' ? t('lessons.translate_to_toki_pona', 'Translate to Toki Pona') :
               currentExercise.type === 'translate-to-en' ? t('lessons.translate_to_english', 'Translate to English') :
               currentExercise.type === 'multiple-choice' ? t('lessons.multiple_choice', 'Multiple Choice') :
               t('lessons.exercise', 'Exercise')}
            </Typography>

            <Typography variant="h4" sx={{ my: 3, fontWeight: 500 }}>
              {currentExercise.question}
            </Typography>

            <TextField
              fullWidth
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('practice.type_answer', 'Type your answer...')}
              variant="outlined"
              autoFocus
              disabled={showFeedback}
              sx={{ mb: 2 }}
            />

            {/* Pronunciation Practice Toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Button
                size="small"
                onClick={handleTogglePronunciation}
                startIcon={showPronunciation ? <MicOff /> : <Mic />}
                variant="outlined"
                color={showPronunciation ? 'secondary' : 'primary'}
              >
                {showPronunciation
                  ? t('practice.hide_pronunciation', 'Hide Pronunciation Practice')
                  : t('practice.show_pronunciation', 'Practice Pronunciation')
                }
              </Button>
            </Box>

            {/* Pronunciation Practice Panel */}
            <Collapse in={showPronunciation} sx={{ mb: 2 }}>
              <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                <SpeechRecognition
                  targetText={currentExercise.answer}
                  onResult={handlePronunciationResult}
                />
              </Paper>
            </Collapse>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!userAnswer.trim() || showFeedback}
              size="large"
            >
              {t('practice.submit', 'Submit')}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Live Stats */}
      {isRunning && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label={`${t('practice.answered', 'Answered')}: ${speedStats.totalAnswered}`}
            variant="outlined"
          />
          <Chip
            label={`${t('practice.accuracy', 'Accuracy')}: ${Math.round(accuracy)}%`}
            color="info"
            variant="outlined"
          />
          <Chip
            label={`${t('practice.streak', 'Streak')}: ${currentStreak}`}
            color={currentStreak >= 5 ? 'success' : 'warning'}
            variant="outlined"
          />
          <Chip
            label={`XP: +${speedStats.xpEarned}`}
            color="primary"
            variant="outlined"
          />
        </Box>
      )}
    </Box>
  );
};

export default SpeedPracticeSession;