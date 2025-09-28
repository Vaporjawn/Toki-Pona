import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
} from '@mui/material';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('nav.about')}
        </Typography>
      </Box>

      {/* About Toki Pona */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {t('about.whatIsTokiPona')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('about.description1')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('about.description2')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('about.description3')}
        </Typography>
      </Paper>

      {/* Philosophy */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {t('about.philosophy')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('about.philosophyDescription1')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('about.philosophyDescription2')}
          </Typography>
        </CardContent>
      </Card>

      {/* About This App */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {t('about.aboutPlatform')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('about.platformDescription')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('about.featuresTitle')}
          </Typography>
          <ul>
            <li>{t('about.feature1')}</li>
            <li>{t('about.feature2')}</li>
            <li>{t('about.feature3')}</li>
            <li>{t('about.feature4')}</li>
            <li>{t('about.feature5')}</li>
          </ul>
        </CardContent>
      </Card>

      {/* Sitelen Pona */}
      <Paper sx={{ p: 4, mb: 4, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {t('about.sitelenPona')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('about.sitelenPonaDescription1')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('about.sitelenPonaDescription2')}
        </Typography>
      </Paper>

      {/* Credits */}
      <Box sx={{ textAlign: 'center', py: 4, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          {t('about.credits')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('about.tokiPonaCreator')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('about.platformTech')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {t('about.learnMore')}{' '}
          <a
            href="https://tokipona.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit' }}
          >
            tokipona.org
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutPage;