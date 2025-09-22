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
          What is Toki Pona?
        </Typography>
        <Typography variant="body1" paragraph>
          Toki Pona is a philosophical artistic constructed language known for its small vocabulary.
          It was created by Canadian linguist Sonja Lang (formerly Sonja Kisa) in 2001.
        </Typography>
        <Typography variant="body1" paragraph>
          The language has only 120-137 words (depending on your counting), making it one of the
          smallest languages in the world. Despite its tiny vocabulary, speakers can express complex
          ideas by combining simple concepts.
        </Typography>
        <Typography variant="body1" paragraph>
          The name "toki pona" means "simple language" or "good language" in the language itself.
        </Typography>
      </Paper>

      {/* Philosophy */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Philosophy
          </Typography>
          <Typography variant="body1" paragraph>
            Toki Pona's philosophy is minimalism. The language encourages speakers to break down
            complex thoughts into fundamental concepts, promoting mindfulness and simplicity in
            communication.
          </Typography>
          <Typography variant="body1" paragraph>
            By forcing speakers to think in simpler terms, Toki Pona can help clarify thoughts
            and reduce ambiguity. It's often described as a "linguistic meditation."
          </Typography>
        </CardContent>
      </Card>

      {/* About This App */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            About This Learning Platform
          </Typography>
          <Typography variant="body1" paragraph>
            This interactive learning platform is designed to make learning Toki Pona fun and
            engaging. Using modern web technologies and gamification principles, we've created
            an experience similar to popular language learning apps like Duolingo.
          </Typography>
          <Typography variant="body1" paragraph>
            Features include:
          </Typography>
          <ul>
            <li>Interactive lessons with immediate feedback</li>
            <li>Progress tracking with XP and achievements</li>
            <li>Comprehensive dictionary with sitelen pona script</li>
            <li>Multiple exercise types to reinforce learning</li>
            <li>Multi-language interface support</li>
          </ul>
        </CardContent>
      </Card>

      {/* Sitelen Pona */}
      <Paper sx={{ p: 4, mb: 4, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          sitelen pona
        </Typography>
        <Typography variant="body1" paragraph>
          Sitelen pona is the native writing system of Toki Pona, created by Sonja Lang.
          It uses simple logographic symbols where each symbol represents a word concept.
        </Typography>
        <Typography variant="body1" paragraph>
          This writing system reinforces the minimalist philosophy of the language,
          using basic geometric shapes that are easy to learn and draw.
        </Typography>
      </Paper>

      {/* Credits */}
      <Box sx={{ textAlign: 'center', py: 4, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          Credits
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Toki Pona was created by Sonja Lang
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This learning platform was built with React, TypeScript, and Material-UI
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Learn more at{' '}
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