import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Card,
  CardContent,
  Chip,
  Stack,
  Alert,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../../hooks/useProgress';
import SpeechRecognition from '../SpeechRecognition/SpeechRecognition';
import type { Lesson } from '../../data/lessons';

interface ReviewStats {
  totalReviewed: number;
  correctAnswers: number;
  xpEarned: number;
  timeSpent: number;
}

interface QuickReviewSessionProps {
  lesson: Lesson;
  onExit: () => void;
  onComplete?: (lessonId: string, stats: ReviewStats) => void;
}

const QuickReviewSession: React.FC<QuickReviewSessionProps> = ({
  lesson,
  onExit,
  onComplete
}) => {
  const { t } = useTranslation();
  const { dispatch } = useProgress();

  const shuffledExercises = useMemo(() => {
    return lesson.exercises
      .map(exercise => ({ exercise, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ exercise }) => exercise);
  }, [lesson.exercises]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShowingAnswer, setIsShowingAnswer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [reviewStats, setReviewStats] = useState<ReviewStats>({
    totalReviewed: 0,
    correctAnswers: 0,
    xpEarned: 0,
    timeSpent: 0
  });

  const startTime = useMemo(() => Date.now(), []);
  const [cardStartTime, setCardStartTime] = useState(Date.now());

  // Start practice session
  useEffect(() => {
    dispatch({
      type: 'START_PRACTICE_SESSION',
      payload: {
        type: 'quickReview',
        startedAt: new Date(),
        totalQuestions: shuffledExercises.length,
        timeSpent: 0,
        vocabulary: shuffledExercises.map(ex => ex.question)
      }
    });
  }, [dispatch, shuffledExercises]);

  const handleComplete = useCallback(() => {
    const totalTime = Date.now() - startTime;
    const finalStats = {
      ...reviewStats,
      timeSpent: totalTime
    };

    setIsCompleted(true);

    // Complete practice session
    dispatch({
      type: 'COMPLETE_PRACTICE_SESSION',
      payload: { xpEarned: finalStats.xpEarned }
    });

    onComplete?.(lesson.id.toString(), finalStats);
  }, [reviewStats, startTime, dispatch, lesson.id, onComplete]);

  const handleAnswerFeedback = useCallback((isCorrect: boolean) => {
    const timeSpent = Date.now() - cardStartTime;
    const xpGained = isCorrect ? 5 : 2; // Quick XP for flashcard review

    setReviewStats(prev => ({
      totalReviewed: prev.totalReviewed + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      xpEarned: prev.xpEarned + xpGained,
      timeSpent: prev.timeSpent + timeSpent
    }));

    // Auto-advance after showing result
    setTimeout(() => {
      if (currentIndex < shuffledExercises.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsShowingAnswer(false);
        setCardStartTime(Date.now());
      } else {
        handleComplete();
      }
    }, 1500);
  }, [currentIndex, shuffledExercises.length, cardStartTime, handleComplete]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setIsShowingAnswer(false);
    setIsCompleted(false);
    setShowPronunciation(false);
    setReviewStats({
      totalReviewed: 0,
      correctAnswers: 0,
      xpEarned: 0,
      timeSpent: 0
    });
    setCardStartTime(Date.now());
  }, []);

  const handleShowAnswer = useCallback(() => {
    setIsShowingAnswer(true);
  }, []);

  const handlePronunciationResult = useCallback((transcript: string, confidence: number, isMatch: boolean) => {
    // Log the result for debugging (can be removed in production)
    console.log('Pronunciation result:', { transcript, confidence, isMatch });

    // Provide automatic feedback based on pronunciation accuracy
    handleAnswerFeedback(isMatch);
  }, [handleAnswerFeedback]);

  const handleTogglePronunciation = useCallback(() => {
    setShowPronunciation(prev => !prev);
  }, []);

  const currentExercise = shuffledExercises[currentIndex];
  const progress = ((currentIndex + 1) / shuffledExercises.length) * 100;

  if (isCompleted) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Card>
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <TrophyIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              {t('practice.completed', 'Review Complete!')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {t('practice.great_job', 'Great job reviewing the lesson!')}
            </Typography>

            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">
                  {t('practice.accuracy', 'Accuracy')}:
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {reviewStats.totalReviewed > 0
                    ? Math.round((reviewStats.correctAnswers / reviewStats.totalReviewed) * 100)
                    : 0}%
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">
                  {t('practice.time_spent', 'Time Spent')}:
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {Math.round(reviewStats.timeSpent / 1000)}s
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">
                  {t('practice.xp_earned', 'XP Earned')}:
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="primary.main">
                  +{reviewStats.xpEarned}
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
        {t('practice.no_exercises', 'No exercises available for this lesson.')}
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          {t('practice.quick_review', 'Quick Review')}
        </Typography>
        <Button variant="outlined" onClick={onExit}>
          {t('common.exit', 'Exit')}
        </Button>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {currentIndex + 1} / {shuffledExercises.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round(progress)}%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} />
      </Box>

      {/* Flashcard */}
      <Card sx={{ mb: 3, minHeight: 300 }}>
        <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h6" gutterBottom color="primary.main">
            {currentExercise.type === 'translate-to-tp' ? t('lessons.translate_to_toki_pona', 'Translate to Toki Pona') :
             currentExercise.type === 'translate-to-en' ? t('lessons.translate_to_english', 'Translate to English') :
             currentExercise.type === 'multiple-choice' ? t('lessons.multiple_choice', 'Multiple Choice') :
             currentExercise.type === 'fill-blank' ? t('lessons.fill_in_blank', 'Fill in the Blank') :
             currentExercise.type === 'pronunciation' ? t('lessons.pronunciation', 'Pronunciation') :
             currentExercise.type === 'writing' ? t('lessons.writing', 'Writing') :
             t('lessons.exercise', 'Exercise')}
          </Typography>

          <Typography variant="h4" sx={{ my: 3, fontWeight: 500 }}>
            {currentExercise.question}
          </Typography>

          {!isShowingAnswer && (
            <Button
              variant="contained"
              onClick={handleShowAnswer}
              sx={{ mt: 2 }}
            >
              {t('practice.show_answer', 'Show Answer')}
            </Button>
          )}

          {isShowingAnswer && (
            <Box>
              <Paper sx={{ p: 3, mt: 3, bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
                <Typography variant="h5" sx={{ mb: 2, color: 'success.main' }}>
                  {currentExercise.answer}
                </Typography>
                {currentExercise.explanation && (
                  <Typography variant="body2" color="text.secondary">
                    {currentExercise.explanation}
                  </Typography>
                )}
              </Paper>

              <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
                {t('practice.how_did_you_do', 'How did you do?')}
              </Typography>

              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  startIcon={<CloseIcon />}
                  onClick={() => handleAnswerFeedback(false)}
                  color="error"
                >
                  {t('practice.incorrect', 'Incorrect')}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CheckIcon />}
                  onClick={() => handleAnswerFeedback(true)}
                  color="success"
                >
                  {t('practice.correct', 'Correct')}
                </Button>
              </Stack>

              {/* Pronunciation Practice Option */}
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="text"
                  onClick={handleTogglePronunciation}
                  size="small"
                >
                  {showPronunciation ? t('practice.hide_pronunciation', 'Hide Pronunciation Practice') : t('practice.try_pronunciation', 'Try Pronunciation Practice')}
                </Button>

                {showPronunciation && (
                  <Box sx={{ mt: 2 }}>
                    <SpeechRecognition
                      targetText={currentExercise.answer}
                      targetLanguage="tp"
                      enabled={true}
                      showTargetText={false}
                      onResult={handlePronunciationResult}
                      onError={(error) => console.error('Speech recognition error:', error)}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Chip
          label={`${t('practice.reviewed', 'Reviewed')}: ${reviewStats.totalReviewed}`}
          variant="outlined"
        />
        <Chip
          label={`${t('practice.correct', 'Correct')}: ${reviewStats.correctAnswers}`}
          color="success"
          variant="outlined"
        />
        <Chip
          label={`XP: +${reviewStats.xpEarned}`}
          color="primary"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default QuickReviewSession;