import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack
} from '@mui/material';
import {
  CheckCircle,
  Close,
  TrendingUp,
  EmojiEvents,
  School
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../../hooks/useProgress';
import Exercise from '../Exercise/Exercise';
import type { Lesson } from '../../data/lessons';

interface ExerciseSessionProps {
  lesson: Lesson;
  onComplete?: (lessonId: string, score: string) => void;
  onExit?: () => void;
}

interface SessionStats {
  completed: number;
  correct: number;
  total: number;
  xpEarned: number;
}

export const ExerciseSession: React.FC<ExerciseSessionProps> = ({
  lesson,
  onComplete,
  onExit
}) => {
  const { t } = useTranslation();
  const { dispatch } = useProgress();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
  const [correctAnswers, setCorrectAnswers] = useState<Set<number>>(new Set());
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    completed: 0,
    correct: 0,
    total: lesson.exercises.length,
    xpEarned: 0
  });
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progress = (completedExercises.size / lesson.exercises.length) * 100;

  // Calculate session statistics
  useEffect(() => {
    const completed = completedExercises.size;
    const correct = correctAnswers.size;
    const xpEarned = correct * 10; // 10 XP per correct answer

    setSessionStats({
      completed,
      correct,
      total: lesson.exercises.length,
      xpEarned
    });
  }, [completedExercises, correctAnswers, lesson.exercises.length]);

  const handleExerciseComplete = useCallback((exerciseId: string, isCorrect: boolean, timeTaken: number) => {
    const exerciseIndex = lesson.exercises.findIndex(ex => ex.id === exerciseId);

    if (exerciseIndex === -1) return;

    // Mark exercise as completed
    setCompletedExercises(prev => new Set([...prev, exerciseIndex]));

    // Track correct answers
    if (isCorrect) {
      setCorrectAnswers(prev => new Set([...prev, exerciseIndex]));

      // Record exercise completion in progress system
      dispatch({
        type: 'COMPLETE_EXERCISE',
        payload: {
          lessonId: lesson.id.toString(),
          exerciseId,
          score: isCorrect ? 100 : 0,
          timeSpent: timeTaken
        }
      });
    }

    // Check if all exercises are complete
    const newCompleted = new Set([...completedExercises, exerciseIndex]);
    if (newCompleted.size === lesson.exercises.length) {
      // Session complete - calculate final score
      const finalCorrect = isCorrect ? correctAnswers.size + 1 : correctAnswers.size;
      const score = Math.round((finalCorrect / lesson.exercises.length) * 100);
      const xpEarned = finalCorrect * 10; // 10 XP per correct answer

      // Complete the lesson in progress system
      dispatch({
        type: 'COMPLETE_LESSON',
        payload: {
          lessonId: lesson.id.toString(),
          totalScore: score,
          timeSpent: timeTaken,
          xpEarned
        }
      });

      setSessionComplete(true);
      setShowCompleteDialog(true);

      if (onComplete) {
        onComplete(lesson.id.toString(), score.toString());
      }
    }
  }, [lesson, completedExercises, correctAnswers, dispatch, onComplete]);  const handleNextExercise = useCallback(() => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    }
  }, [currentExerciseIndex, lesson.exercises.length]);

  const handlePreviousExercise = useCallback(() => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
    }
  }, [currentExerciseIndex]);

  const handleExitSession = useCallback(() => {
    if (onExit) {
      onExit();
    }
  }, [onExit]);

  const getProgressColor = useCallback(() => {
    if (progress >= 80) return 'success';
    if (progress >= 60) return 'info';
    if (progress >= 40) return 'warning';
    return 'error';
  }, [progress]);

  const getScoreColor = useCallback((score: number) => {
    if (score >= 90) return 'success';
    if (score >= 75) return 'info';
    if (score >= 60) return 'warning';
    return 'error';
  }, []);

  if (!currentExercise) {
    return (
      <Alert severity="error">
        {t('exercise.noExercisesFound', 'No exercises found for this lesson.')}
      </Alert>
    );
  }

  const finalScore = sessionComplete ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      {/* Session Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            {lesson.title}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Close />}
            onClick={handleExitSession}
            sx={{ minWidth: 100 }}
          >
            {t('common.exit', 'Exit')}
          </Button>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {t('exercise.progress', 'Progress')}: {completedExercises.size} / {lesson.exercises.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(progress)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={getProgressColor()}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        {/* Session Stats */}
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Chip
            icon={<School />}
            label={`${sessionStats.completed}/${sessionStats.total} ${t('exercise.completed', 'Completed')}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            icon={<CheckCircle />}
            label={`${sessionStats.correct} ${t('exercise.correct', 'Correct')}`}
            color="success"
            variant="outlined"
          />
          <Chip
            icon={<TrendingUp />}
            label={`${sessionStats.xpEarned} XP`}
            color="info"
            variant="outlined"
          />
        </Stack>
      </Paper>

      {/* Current Exercise */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t('exercise.question', 'Question')} {currentExerciseIndex + 1} {t('common.of', 'of')} {lesson.exercises.length}
          </Typography>

          {completedExercises.has(currentExerciseIndex) && (
            <Alert
              severity={correctAnswers.has(currentExerciseIndex) ? "success" : "info"}
              sx={{ mb: 2 }}
            >
              {correctAnswers.has(currentExerciseIndex)
                ? t('exercise.correctlyAnswered', 'You answered this correctly!')
                : t('exercise.alreadyAnswered', 'You have already answered this exercise.')
              }
            </Alert>
          )}
        </Box>

        <Exercise
          exercise={currentExercise}
          onComplete={handleExerciseComplete}
          showHints={true}
          allowRetry={true}
        />
      </Paper>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          variant="outlined"
          onClick={handlePreviousExercise}
          disabled={currentExerciseIndex === 0}
        >
          {t('common.previous', 'Previous')}
        </Button>

        <Button
          variant="contained"
          onClick={handleNextExercise}
          disabled={currentExerciseIndex >= lesson.exercises.length - 1}
        >
          {t('common.next', 'Next')}
        </Button>
      </Box>

      {/* Completion Dialog */}
      <Dialog
        open={showCompleteDialog}
        onClose={() => setShowCompleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          <EmojiEvents sx={{ fontSize: 60, color: 'gold', mb: 2 }} />
          <Typography variant="h4" component="div">
            {t('exercise.lessonComplete', 'Lesson Complete!')}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            {lesson.title}
          </Typography>

          <Box sx={{ my: 3 }}>
            <Typography variant="h3" color={getScoreColor(finalScore)} gutterBottom>
              {finalScore}%
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {sessionStats.correct} {t('common.of', 'of')} {sessionStats.total} {t('exercise.correct', 'correct')}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Chip
              icon={<TrendingUp />}
              label={`+${sessionStats.xpEarned} XP`}
              color="success"
            />
          </Stack>

          {finalScore >= 80 && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {t('exercise.excellentWork', 'Excellent work! You\'re really getting the hang of Toki Pona!')}
            </Alert>
          )}

          {finalScore >= 60 && finalScore < 80 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              {t('exercise.goodWork', 'Good work! Keep practicing to improve your score.')}
            </Alert>
          )}

          {finalScore < 60 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {t('exercise.keepPracticing', 'Keep practicing! Review the lesson content and try again.')}
            </Alert>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            variant="outlined"
            onClick={handleExitSession}
            sx={{ minWidth: 120 }}
          >
            {t('common.finish', 'Finish')}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setShowCompleteDialog(false);
              setCurrentExerciseIndex(0);
              setCompletedExercises(new Set());
              setCorrectAnswers(new Set());
              setSessionComplete(false);
            }}
            sx={{ minWidth: 120 }}
          >
            {t('exercise.practiceAgain', 'Practice Again')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExerciseSession;