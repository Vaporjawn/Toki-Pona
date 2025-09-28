import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Card,
  CardContent,
  Stack,
  Chip,
  Alert,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Collapse
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Refresh,
  Timer,
  EmojiEvents,
  Close,
  Mic,
  MicOff
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../../hooks/useProgress';
import SpeechRecognition from '../SpeechRecognition/SpeechRecognition';
import type { Lesson, Exercise } from '../../data/lessons';

interface RandomQuizSessionProps {
  lesson: Lesson;
  onComplete?: (lessonId: string, stats: QuizStats) => void;
  onExit?: () => void;
}

interface QuizStats {
  totalQuestions: number;
  correctAnswers: number;
  xpEarned: number;
  timeSpent: number;
  averageTime: number;
}

interface QuizQuestion {
  exercise: Exercise;
  options?: string[];
  userAnswer?: string;
  isCorrect?: boolean;
  timeTaken?: number;
}

const RandomQuizSession: React.FC<RandomQuizSessionProps> = ({
  lesson,
  onComplete,
  onExit
}) => {
  const { t } = useTranslation();
  const { dispatch } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [quizStats, setQuizStats] = useState<QuizStats>({
    totalQuestions: 0,
    correctAnswers: 0,
    xpEarned: 0,
    timeSpent: 0,
    averageTime: 0
  });
  const [startTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  // Generate quiz questions with multiple choice options
  useEffect(() => {
    const shuffledExercises = [...lesson.exercises].sort(() => Math.random() - 0.5);
    const quizQuestions: QuizQuestion[] = shuffledExercises.map(exercise => {
      // Generate multiple choice options for some question types
      if (exercise.type === 'translate-to-tp' || exercise.type === 'translate-to-en') {
        const otherAnswers = lesson.exercises
          .filter(e => e.id !== exercise.id && e.type === exercise.type)
          .map(e => e.answer)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        const options = [exercise.answer, ...otherAnswers].sort(() => Math.random() - 0.5);
        return { exercise, options };
      }

      return { exercise };
    });

    setQuestions(quizQuestions);
    setQuestionStartTime(Date.now());
  }, [lesson.exercises]);

  const currentQuestion = questions[currentIndex];

  const handleSubmit = useCallback(() => {
    if (!currentQuestion || !userAnswer.trim()) return;

    const timeTaken = Date.now() - questionStartTime;
    const isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.exercise.answer.toLowerCase().trim();
    const xpGained = isCorrect ? 10 : 3; // Higher XP for quiz questions

    // Update question with result
    setQuestions(prev => prev.map((q, idx) =>
      idx === currentIndex
        ? { ...q, userAnswer, isCorrect, timeTaken }
        : q
    ));

    setIsSubmitted(true);

    // Update stats
    setQuizStats(prev => ({
      totalQuestions: prev.totalQuestions + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      xpEarned: prev.xpEarned + xpGained,
      timeSpent: prev.timeSpent + timeTaken,
      averageTime: (prev.timeSpent + timeTaken) / (prev.totalQuestions + 1)
    }));

    // Award XP immediately
    // XP will be added when completing the practice session
  }, [currentQuestion, userAnswer, questionStartTime, currentIndex]);

  const handleComplete = useCallback(() => {
    const totalTime = Date.now() - startTime;
    const finalStats = {
      ...quizStats,
      timeSpent: totalTime,
      averageTime: totalTime / questions.length
    };

    setIsCompleted(true);

    // Record practice session
    dispatch({
      type: 'COMPLETE_PRACTICE_SESSION',
      payload: { xpEarned: finalStats.xpEarned }
    });    onComplete?.(lesson.id.toString(), finalStats);
  }, [quizStats, startTime, questions.length, dispatch, lesson.id, onComplete]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setIsSubmitted(false);
      setQuestionStartTime(Date.now());
    } else {
      handleComplete();
    }
  }, [currentIndex, questions.length, handleComplete]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setUserAnswer('');
    setIsSubmitted(false);
    setShowPronunciation(false);
    setQuizStats({
      totalQuestions: 0,
      correctAnswers: 0,
      xpEarned: 0,
      timeSpent: 0,
      averageTime: 0
    });
    setIsCompleted(false);
  }, []);

  const handlePronunciationResult = useCallback((transcript: string, confidence: number, isMatch: boolean) => {
    // Auto-fill the answer if pronunciation matches
    if (isMatch) {
      setUserAnswer(transcript);
    }
    console.log('Pronunciation result:', { transcript, confidence, isMatch });
  }, []);

  const handleTogglePronunciation = useCallback(() => {
    setShowPronunciation(prev => !prev);
  }, []);

  const progress = questions.length > 0 ? ((currentIndex) / questions.length) * 100 : 0;
  const accuracy = quizStats.totalQuestions > 0
    ? (quizStats.correctAnswers / quizStats.totalQuestions) * 100
    : 0;

  if (isCompleted) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 500 }}>
          <EmojiEvents sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            {t('practice.randomQuiz.complete', 'Quiz Complete!')}
          </Typography>

          <Stack spacing={2} sx={{ mt: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">{t('practice.stats.questions', 'Questions')}:</Typography>
              <Typography variant="body1" fontWeight="bold">{quizStats.totalQuestions}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">{t('practice.stats.accuracy', 'Accuracy')}:</Typography>
              <Typography variant="body1" fontWeight="bold">{accuracy.toFixed(1)}%</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">{t('practice.stats.avgTime', 'Avg Time')}:</Typography>
              <Typography variant="body1" fontWeight="bold">
                {(quizStats.averageTime / 1000).toFixed(1)}s
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">{t('practice.stats.xpEarned', 'XP Earned')}:</Typography>
              <Chip label={`+${quizStats.xpEarned} XP`} color="primary" />
            </Box>
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="outlined" onClick={handleRestart} startIcon={<Refresh />}>
              {t('practice.tryAgain', 'Try Again')}
            </Button>
            <Button variant="contained" onClick={onExit}>
              {t('common.done', 'Done')}
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  if (!currentQuestion) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6">{t('common.loading', 'Loading...')}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '80vh', p: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" component="h1">
            {t('practice.randomQuiz.title', 'Random Quiz')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {lesson.title}
          </Typography>
        </Box>
        <Button variant="text" onClick={onExit} startIcon={<Close />}>
          {t('common.exit', 'Exit')}
        </Button>
      </Box>

      {/* Progress */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">
            {t('practice.progress', 'Progress')}: {currentIndex + 1} / {questions.length}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              {t('practice.stats.accuracy', 'Accuracy')}: {accuracy.toFixed(1)}%
            </Typography>
            <Chip
              icon={<Timer />}
              label={`${Math.floor((Date.now() - questionStartTime) / 1000)}s`}
              size="small"
            />
          </Box>
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
      </Box>

      {/* Question */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {currentQuestion.exercise.type === 'translate-to-tp' ? t('lessons.translate_to_toki_pona', 'Translate to Toki Pona') :
             currentQuestion.exercise.type === 'translate-to-en' ? t('lessons.translate_to_english', 'Translate to English') :
             t('lessons.question', 'Question')}
          </Typography>

          <Typography variant="h4" component="div" sx={{ mb: 4, color: 'primary.main' }}>
            {currentQuestion.exercise.question}
          </Typography>

          {/* Answer Input */}
          {currentQuestion.options ? (
            // Multiple Choice
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              >
                {currentQuestion.options.map((option, index) => (
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
          ) : (
            // Text Input
            <TextField
              fullWidth
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={t('lessons.enterAnswer', 'Enter your answer...')}
              disabled={isSubmitted}
              onKeyPress={(e) => e.key === 'Enter' && !isSubmitted && handleSubmit()}
              sx={{ mb: 2 }}
            />
          )}

          {/* Feedback */}
          {isSubmitted && (
            <Alert
              severity={currentQuestion.isCorrect ? 'success' : 'error'}
              icon={currentQuestion.isCorrect ? <CheckCircle /> : <Cancel />}
              sx={{ mt: 2, mb: 2 }}
            >
              {currentQuestion.isCorrect
                ? t('practice.feedback.correct', 'Correct!')
                : t('practice.feedback.incorrect', `Incorrect. The answer is: ${currentQuestion.exercise.answer}`)
              }
              {currentQuestion.exercise.hint && !currentQuestion.isCorrect && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Hint:</strong> {currentQuestion.exercise.hint}
                </Typography>
              )}
            </Alert>
          )}

          {/* Pronunciation Practice */}
          {!currentQuestion.options && isSubmitted && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {t('audio.pronunciationPractice', 'Pronunciation Practice')}
                </Typography>
                <Button
                  size="small"
                  onClick={handleTogglePronunciation}
                  startIcon={showPronunciation ? <MicOff /> : <Mic />}
                  sx={{ fontSize: '0.75rem' }}
                >
                  {showPronunciation
                    ? t('audio.hidePronunciation', 'Hide Pronunciation')
                    : t('audio.tryPronunciation', 'Try Pronunciation')
                  }
                </Button>
              </Box>

              <Collapse in={showPronunciation}>
                <Box sx={{ mt: 1 }}>
                  <SpeechRecognition
                    targetText={currentQuestion.exercise.answer}
                    targetLanguage="tp"
                    onResult={handlePronunciationResult}
                  />
                </Box>
              </Collapse>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="outlined" onClick={onExit}>
              {t('common.exit', 'Exit')}
            </Button>

            {!isSubmitted ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
              >
                {t('common.submit', 'Submit')}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                {currentIndex < questions.length - 1
                  ? t('common.next', 'Next')
                  : t('common.finish', 'Finish')
                }
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RandomQuizSession;