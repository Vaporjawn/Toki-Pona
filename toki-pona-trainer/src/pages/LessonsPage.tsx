import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Mock lesson data - this will be replaced with real data later
const mockLessons = [
  {
    id: 1,
    title: 'Basic Greetings',
    description: 'Learn how to say hello and introduce yourself',
    completed: true,
    xp: 50,
    totalExercises: 8,
    completedExercises: 8,
  },
  {
    id: 2,
    title: 'People and Things',
    description: 'Essential words for describing people and objects',
    completed: true,
    xp: 75,
    totalExercises: 12,
    completedExercises: 12,
  },
  {
    id: 3,
    title: 'Actions and Verbs',
    description: 'Common verbs and how to use them',
    completed: false,
    xp: 0,
    totalExercises: 10,
    completedExercises: 6,
  },
  {
    id: 4,
    title: 'Colors and Description',
    description: 'Describing things with colors and attributes',
    completed: false,
    xp: 0,
    totalExercises: 8,
    completedExercises: 0,
    locked: true,
  },
  {
    id: 5,
    title: 'Time and Numbers',
    description: 'Talking about time and basic counting',
    completed: false,
    xp: 0,
    totalExercises: 15,
    completedExercises: 0,
    locked: true,
  },
];

const LessonsPage: React.FC = () => {
  const { t } = useTranslation();

  const totalXP = mockLessons.reduce((sum, lesson) => sum + lesson.xp, 0);
  const completedLessons = mockLessons.filter(lesson => lesson.completed).length;

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('lessons.title')}
        </Typography>

        {/* Progress Overview */}
        <Box sx={{ mb: 4, p: 3, bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t('lessons.progress', { current: completedLessons, total: mockLessons.length })}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t('lessons.xp', { xp: totalXP })}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(completedLessons / mockLessons.length) * 100}
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
      </Box>

      {/* Lessons Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
        {mockLessons.map((lesson) => (
          <Card
            key={lesson.id}
            sx={{
              position: 'relative',
              opacity: lesson.locked ? 0.6 : 1,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: lesson.locked ? 'none' : 'translateY(-2px)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                  {lesson.title}
                </Typography>
                {lesson.completed && (
                  <CheckCircleIcon sx={{ color: 'success.main', ml: 1 }} />
                )}
                {lesson.locked && (
                  <LockIcon sx={{ color: 'text.secondary', ml: 1 }} />
                )}
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {lesson.description}
              </Typography>

              {/* Progress bar for current lesson */}
              {!lesson.completed && !lesson.locked && lesson.completedExercises > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Progress: {lesson.completedExercises}/{lesson.totalExercises}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(lesson.completedExercises / lesson.totalExercises) * 100}
                    sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
                  />
                </Box>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {lesson.completed && (
                    <Chip
                      label={t('lessons.completed')}
                      color="success"
                      size="small"
                    />
                  )}
                  {lesson.xp > 0 && (
                    <Chip
                      label={`${lesson.xp} XP`}
                      color="primary"
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>

                <Button
                  component={lesson.locked ? 'button' : Link}
                  to={lesson.locked ? undefined : `/lessons/${lesson.id}`}
                  variant={lesson.completed ? 'outlined' : 'contained'}
                  startIcon={lesson.locked ? <LockIcon /> : <PlayArrowIcon />}
                  disabled={lesson.locked}
                  size="small"
                >
                  {lesson.locked
                    ? 'Locked'
                    : lesson.completed
                    ? 'Review'
                    : lesson.completedExercises > 0
                    ? t('lessons.continue')
                    : t('lessons.start')
                  }
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Achievement Section */}
      <Box sx={{ mt: 6, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
        <Typography variant="h5" gutterBottom>
          🏆 Your Progress
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label="First Steps"
            color="primary"
            variant={completedLessons >= 1 ? 'filled' : 'outlined'}
          />
          <Chip
            label="Getting Started"
            color="primary"
            variant={completedLessons >= 2 ? 'filled' : 'outlined'}
          />
          <Chip
            label="Making Progress"
            color="primary"
            variant={completedLessons >= 3 ? 'filled' : 'outlined'}
          />
          <Chip
            label="Dedicated Learner"
            color="primary"
            variant={totalXP >= 200 ? 'filled' : 'outlined'}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LessonsPage;