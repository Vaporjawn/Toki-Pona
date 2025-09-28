import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import {
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  PlayArrow as PlayArrowIcon,
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: t('home.features.interactive'),
      description: t('home.features.interactive.desc'),
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: t('home.features.progress'),
      description: t('home.features.progress.desc'),
    },
    {
      icon: <VisibilityIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: t('home.features.immersive'),
      description: t('home.features.immersive.desc'),
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 6, md: 10 },
          px: { xs: 3, sm: 4, md: 6 },
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
          borderRadius: { xs: 1, sm: 2, md: 3 },
          color: 'white',
          mb: 6,
          mx: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          {t('home.title')}
        </Typography>
        <Typography variant="h4" component="h2" sx={{ mb: 4, opacity: 0.9 }}>
          {t('home.subtitle')}
        </Typography>
        <Typography variant="h6" sx={{ mb: 6, maxWidth: 600, mx: 'auto', opacity: 0.9 }}>
          {t('home.description')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={Link}
            to="/lessons"
            variant="contained"
            size="large"
            startIcon={<PlayArrowIcon />}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            {t('home.startLearning')}
          </Button>
          <Button
            component={Link}
            to="/dictionary"
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {t('nav.dictionary')}
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ mb: 8, px: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          {t('home.learnEfficiently')}
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          {t('home.whyTokiPona')}
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                textAlign: 'center',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Toki Pona Sample Section */}
      <Paper
        sx={{
          p: { xs: 4, sm: 5, md: 6 },
          mb: 8,
          mx: { xs: 2, sm: 3, md: 4 },
          background: 'linear-gradient(135deg, #E65100 0%, #FF8F00 100%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'white' }}>
          "{t('home.exampleTokiPona')}"
        </Typography>
        <Typography variant="h6" sx={{ color: 'white', opacity: 0.9, mb: 3 }}>
          "{t('home.exampleTranslation')}"
        </Typography>
        <Typography variant="body1" sx={{ color: 'white', opacity: 0.8, maxWidth: 500, mx: 'auto' }}>
          {t('home.exampleDescription')}
        </Typography>
      </Paper>

      {/* Quick Stats */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
        gap: 4,
        mb: 8,
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Box textAlign="center">
          <Typography variant="h3" component="div" color="primary.main" fontWeight="bold">
            120-137
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {t('home.stats.totalWords')}
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="h3" component="div" color="primary.main" fontWeight="bold">
            ~2 weeks
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {t('home.stats.toFluency')}
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="h3" component="div" color="primary.main" fontWeight="bold">
            2001
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {t('home.stats.createdBy')}
          </Typography>
        </Box>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          textAlign: 'center',
          p: { xs: 4, sm: 5, md: 6 },
          mx: { xs: 2, sm: 3, md: 4 },
          border: 2,
          borderColor: 'primary.main',
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          {t('home.readyToBegin')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('home.beginJourney')}
        </Typography>
        <Button
          component={Link}
          to="/lessons"
          variant="contained"
          size="large"
          startIcon={<PlayArrowIcon />}
        >
          {t('home.startLearning')}
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;