import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLessonTranslations, type TranslatedLesson } from '../hooks/useLessonTranslations';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Chip,
  Avatar,
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
  Lock as LockIcon,
  MenuBook as BookIcon,
  School as SchoolIcon,
  Quiz as QuizIcon,
  Groups as GroupsIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';
import { isLessonUnlocked, calculateTotalXP } from '../data/lessons';

// Mock progress data - in a real app, this would come from user state/localStorage
const mockCompletedLessons = [1, 2]; // Lessons 1 and 2 are completed
const mockLessonProgress: Record<number, number> = {
  3: 0.6, // 60% progress on lesson 3
};

const LessonsPage: React.FC = () => {
  const { t } = useTranslation();
  const { getAllLessons } = useLessonTranslations();

  // Get translated lessons
  const translatedLessons = getAllLessons();

  // Calculate progress based on real lesson data
  const completedLessons = mockCompletedLessons.length;
  const totalLessons = translatedLessons.length;
  const earnedXP = translatedLessons
    .filter(lesson => mockCompletedLessons.includes(lesson.id))
    .reduce((sum, lesson) => sum + lesson.xp, 0);
  const totalPossibleXP = calculateTotalXP();

  // Helper function to get lesson status
  const getLessonStatus = (lesson: TranslatedLesson) => {
    const isCompleted = mockCompletedLessons.includes(lesson.id);
    const isUnlocked = isLessonUnlocked(lesson.id, mockCompletedLessons);
    const progress = mockLessonProgress[lesson.id] || 0;

    return {
      isCompleted,
      isUnlocked,
      progress,
      isLocked: !isUnlocked && !isCompleted
    };
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'foundation': return <BookIcon />;
      case 'grammar': return <SchoolIcon />;
      case 'vocabulary': return <QuizIcon />;
      case 'culture': return <GroupsIcon />;
      case 'practice': return <PsychologyIcon />;
      default: return <BookIcon />;
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string): 'success' | 'warning' | 'error' | 'primary' => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'primary';
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('lessons.title')}
        </Typography>

        {/* Progress Overview */}
        <Box sx={{ mb: 4, p: 3, bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Progress: {completedLessons}/{totalLessons} lessons completed
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            XP Earned: {earnedXP}/{totalPossibleXP}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(completedLessons / totalLessons) * 100}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'rgba(255, 255, 255, 0.3)',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'white',
              },
            }}
          />
        </Box>

        {/* Learning Path Overview */}
        <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <Typography variant="h5" gutterBottom>
            {t('lessons.learningJourney')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {t('lessons.journeyDescription')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              label="Foundation (1-4)"
              color="success"
              variant={completedLessons >= 4 ? 'filled' : 'outlined'}
            />
            <Chip
              label="Vocabulary (5-8)"
              color="warning"
              variant={completedLessons >= 8 ? 'filled' : 'outlined'}
            />
            <Chip
              label="Advanced Grammar (9-13)"
              color="info"
              variant={completedLessons >= 13 ? 'filled' : 'outlined'}
            />
            <Chip
              label="Mastery (14-16)"
              color="error"
              variant={completedLessons >= 16 ? 'filled' : 'outlined'}
            />
          </Box>
        </Box>
      </Box>

      {/* Lessons Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
        {translatedLessons.map((lesson) => {
          const status = getLessonStatus(lesson);
          const categoryIcon = getCategoryIcon(lesson.category);
          const difficultyColor = getDifficultyColor(lesson.difficulty);

          return (
            <Card
              key={lesson.id}
              sx={{
                position: 'relative',
                opacity: status.isLocked ? 0.6 : 1,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: status.isLocked ? 'none' : 'translateY(-2px)',
                },
                minHeight: 280,
              }}
            >
              <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar sx={{ bgcolor: `${difficultyColor}.main`, mr: 2, mt: 0.5 }}>
                    {categoryIcon}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                        {lesson.id}. {lesson.title}
                      </Typography>
                      {status.isCompleted && (
                        <CheckCircleIcon sx={{ color: 'success.main', ml: 1 }} />
                      )}
                      {status.isLocked && (
                        <LockIcon sx={{ color: 'text.secondary', ml: 1 }} />
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip
                        label={lesson.difficulty}
                        color={difficultyColor}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={lesson.category}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Description */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                  {lesson.description}
                </Typography>

                {/* Time and XP info */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    ⏱️ {lesson.estimatedTime} min • 🏆 {lesson.xp} XP
                  </Typography>
                  {lesson.vocabulary.length > 0 && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      📚 {lesson.vocabulary.length} new words
                    </Typography>
                  )}
                </Box>

                {/* Progress bar for lessons in progress */}
                {!status.isCompleted && !status.isLocked && status.progress > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Progress: {Math.round(status.progress * 100)}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={status.progress * 100}
                      sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
                    />
                  </Box>
                )}

                {/* Action buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {status.isCompleted && (
                      <Chip
                        label="Completed"
                        color="success"
                        size="small"
                      />
                    )}
                  </Box>

                  <Button
                    component={status.isLocked ? 'button' : Link}
                    to={status.isLocked ? undefined : `/lessons/${lesson.id}`}
                    variant={status.isCompleted ? 'outlined' : 'contained'}
                    startIcon={status.isLocked ? <LockIcon /> : <PlayArrowIcon />}
                    disabled={status.isLocked}
                    size="small"
                  >
                    {status.isLocked
                      ? 'Locked'
                      : status.isCompleted
                      ? 'Review'
                      : status.progress > 0
                      ? 'Continue'
                      : 'Start'
                    }
                  </Button>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Achievement Section */}
      <Box sx={{ mt: 6, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
        <Typography variant="h5" gutterBottom>
          {t('lessons.achievements')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label={t('lessons.achievement.firstSteps')}
            color="primary"
            variant={completedLessons >= 1 ? 'filled' : 'outlined'}
          />
          <Chip
            label={t('lessons.achievement.gettingStarted')}
            color="primary"
            variant={completedLessons >= 2 ? 'filled' : 'outlined'}
          />
          <Chip
            label={t('lessons.achievement.foundationMaster')}
            color="success"
            variant={completedLessons >= 4 ? 'filled' : 'outlined'}
          />
          <Chip
            label={t('lessons.achievement.vocabularyBuilder')}
            color="warning"
            variant={completedLessons >= 8 ? 'filled' : 'outlined'}
          />
          <Chip
            label={t('lessons.achievement.grammarExpert')}
            color="info"
            variant={completedLessons >= 13 ? 'filled' : 'outlined'}
          />
          <Chip
            label={t('lessons.achievement.tokiPonaMaster')}
            color="error"
            variant={completedLessons >= 16 ? 'filled' : 'outlined'}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LessonsPage;