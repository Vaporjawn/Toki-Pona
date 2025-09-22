import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  Quiz as QuizIcon,
  Shuffle as ShuffleIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

const PracticePage: React.FC = () => {
  const { t } = useTranslation();

  const practiceTypes = [
    {
      title: 'Quick Review',
      description: 'Review words you\'ve learned with flashcards',
      icon: <QuizIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      action: 'Start Review',
    },
    {
      title: 'Random Quiz',
      description: 'Test your knowledge with random questions',
      icon: <ShuffleIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      action: 'Take Quiz',
    },
    {
      title: 'Speed Practice',
      description: 'Quick-fire translation exercises',
      icon: <SpeedIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      action: 'Start Practice',
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('nav.practice')}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Practice and reinforce your Toki Pona skills
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
                transform: 'translateY(-4px)',
              },
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
              <Button variant="contained" size="large" disabled>
                {practice.action}
              </Button>
              <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                Coming soon
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PracticePage;