import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Container,
} from '@mui/material';
import {
  Quiz as QuizIcon,
  Shuffle as ShuffleIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { tokiPonaLessons, type Lesson } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import QuickReviewSession from '../components/QuickReviewSession/QuickReviewSession';
import RandomQuizSession from '../components/RandomQuizSession/RandomQuizSession';
import SpeedPracticeSession from '../components/SpeedPracticeSession/SpeedPracticeSession';

// Import the specific stats interfaces
interface ReviewStats {
  totalReviewed: number;
  correctAnswers: number;
  xpEarned: number;
  timeSpent: number;
}

interface QuizStats {
  totalQuestions: number;
  correctAnswers: number;
  xpEarned: number;
  timeSpent: number;
  averageTime: number;
}

interface SpeedStats {
  totalAnswered: number;
  correctAnswers: number;
  xpEarned: number;
  timeSpent: number;
  averageResponseTime: number;
  streak: number;
  maxStreak: number;
}

const PracticePage: React.FC = () => {
  const { t } = useTranslation();
  const { state } = useProgress();

  const [showPracticeDialog, setShowPracticeDialog] = useState(false);
  const [selectedPracticeType, setSelectedPracticeType] = useState<string>('');
  const [practiceLesson, setPracticeLesson] = useState<Lesson | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<number>(0);
  const [activePracticeMode, setActivePracticeMode] = useState<'quick' | 'quiz' | 'speed' | null>(null);

  // Get completed lessons for practice options
  const completedLessonIds = state.userProgress.lessonsProgress
    .filter(progress => progress.completed)
    .map(progress => parseInt(progress.lessonId));

  const completedLessons = tokiPonaLessons.filter(lesson =>
    completedLessonIds.includes(lesson.id)
  );

  const handlePracticeClick = (practiceType: string) => {
    setSelectedPracticeType(practiceType);
    if (practiceType === 'quickReview' && completedLessons.length > 0) {
      // For quick review, randomly select a completed lesson
      const randomLesson = completedLessons[Math.floor(Math.random() * completedLessons.length)];
      setPracticeLesson(randomLesson);
      setActivePracticeMode('quick');
    } else {
      setShowPracticeDialog(true);
    }
  };

  const handleLessonSelect = () => {
    const selectedLesson = tokiPonaLessons.find(lesson => lesson.id === selectedLessonId);
    if (selectedLesson) {
      setPracticeLesson(selectedLesson);
      // Set the practice mode based on selected type
      if (selectedPracticeType === 'randomQuiz') {
        setActivePracticeMode('quiz');
      } else if (selectedPracticeType === 'speedPractice') {
        setActivePracticeMode('speed');
      }
    }
    setShowPracticeDialog(false);
  };

  const handleQuickReviewComplete = (lessonId: string, stats: ReviewStats) => {
    console.log(`Quick Review completed for lesson ${lessonId} with stats:`, stats);
    setPracticeLesson(null);
    setActivePracticeMode(null);
    // Could add practice session tracking here
  };

  const handleRandomQuizComplete = (lessonId: string, stats: QuizStats) => {
    console.log(`Random Quiz completed for lesson ${lessonId} with stats:`, stats);
    setPracticeLesson(null);
    setActivePracticeMode(null);
    // Could add practice session tracking here
  };

  const handleSpeedPracticeComplete = (lessonId: string, stats: SpeedStats) => {
    console.log(`Speed Practice completed for lesson ${lessonId} with stats:`, stats);
    setPracticeLesson(null);
    setActivePracticeMode(null);
    // Could add practice session tracking here
  };

  const handleExitPractice = () => {
    setPracticeLesson(null);
    setActivePracticeMode(null);
  };

  // If in practice session, show the appropriate practice component
  if (practiceLesson && activePracticeMode) {
    switch (activePracticeMode) {
      case 'quick':
        return (
          <QuickReviewSession
            lesson={practiceLesson}
            onComplete={handleQuickReviewComplete}
            onExit={handleExitPractice}
          />
        );
      case 'quiz':
        return (
          <RandomQuizSession
            lesson={practiceLesson}
            onComplete={handleRandomQuizComplete}
            onExit={handleExitPractice}
          />
        );
      case 'speed':
        return (
          <SpeedPracticeSession
            lesson={practiceLesson}
            onComplete={handleSpeedPracticeComplete}
            onExit={handleExitPractice}
          />
        );
      default:
        return null;
    }
  }

  const practiceTypes = [
    {
      id: 'quickReview',
      title: t('practice.quickReview.title'),
      description: t('practice.quickReview.description'),
      icon: <QuizIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      action: t('practice.quickReview.action'),
      available: completedLessons.length > 0,
    },
    {
      id: 'randomQuiz',
      title: t('practice.randomQuiz.title'),
      description: t('practice.randomQuiz.description'),
      icon: <ShuffleIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      action: t('practice.randomQuiz.action'),
      available: completedLessons.length > 0,
    },
    {
      id: 'speedPractice',
      title: t('practice.speedPractice.title'),
      description: t('practice.speedPractice.description'),
      icon: <SpeedIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      action: t('practice.speedPractice.action'),
      available: completedLessons.length > 0,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', maxWidth: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {t('nav.practice')}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {t('practice.subtitle')}
          </Typography>
        </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {practiceTypes.map((practice, index) => (
          <Card
            key={index}
            sx={{
              textAlign: 'center',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: practice.available ? 'translateY(-4px)' : 'none',
              },
              opacity: practice.available ? 1 : 0.6,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ mb: 2 }}>{practice.icon}</Box>
              <Typography variant="h5" component="h3" gutterBottom>
                {practice.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {practice.description}
              </Typography>

              {practice.available ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handlePracticeClick(practice.id)}
                >
                  {practice.action}
                </Button>
              ) : (
                <>
                  <Button variant="contained" size="large" disabled>
                    {practice.action}
                  </Button>
                  <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                    {t('practice.completeFirstLesson', 'Complete your first lesson to unlock practice')}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Lesson Selection Dialog */}
      <Dialog open={showPracticeDialog} onClose={() => setShowPracticeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedPracticeType === 'randomQuiz' && t('practice.selectRandomQuiz', 'Random Quiz Practice')}
          {selectedPracticeType === 'speedPractice' && t('practice.selectSpeedPractice', 'Speed Practice')}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 3 }}>
            {selectedPracticeType === 'randomQuiz' && t('practice.randomQuizDescription', 'Practice with randomized exercises from a specific lesson')}
            {selectedPracticeType === 'speedPractice' && t('practice.speedPracticeDescription', 'Quick-fire practice session')}
          </Typography>

          <FormControl fullWidth>
            <InputLabel>{t('common.selectLesson', 'Select Lesson')}</InputLabel>
            <Select
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(Number(e.target.value))}
              label={t('common.selectLesson', 'Select Lesson')}
            >
              {completedLessons.map((lesson) => (
                <MenuItem key={lesson.id} value={lesson.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography>{lesson.title}</Typography>
                    <Chip
                      size="small"
                      label={lesson.difficulty}
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPracticeDialog(false)}>
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleLessonSelect}
            disabled={selectedLessonId === 0}
          >
            {t('common.start', 'Start')}
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </Container>
  );
};

export default PracticePage;