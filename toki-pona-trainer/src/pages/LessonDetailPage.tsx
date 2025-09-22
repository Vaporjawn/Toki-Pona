import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
} from '@mui/material';

const LessonDetailPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Lesson {lessonId}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Lesson content will be implemented in the next phase
        </Typography>
      </Box>
    </Box>
  );
};

export default LessonDetailPage;