import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLessonTranslations } from '../hooks/useLessonTranslations';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Alert,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
  Book as BookIcon,
  Quiz as QuizIcon,
} from '@mui/icons-material';

const LessonDetailPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { getLesson } = useLessonTranslations();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const lesson = lessonId ? getLesson(parseInt(lessonId)) : null;

  if (!lesson) {
    return (
      <Box sx={{ width: '100%', maxWidth: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Lesson Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            The lesson you're looking for doesn't exist or hasn't been created yet.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/lessons')}
          >
            Back to Lessons
          </Button>
        </Box>
      </Box>
    );
  }

  const handleCompleteExercise = (exerciseIndex: number) => {
    if (!completedExercises.includes(exerciseIndex)) {
      setCompletedExercises([...completedExercises, exerciseIndex]);
    }
  };

  const progress = lesson.sections.length > 0 ? (currentSection + 1) / lesson.sections.length : 0;

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/lessons')}
          sx={{ mb: 2 }}
        >
          Back to Lessons
        </Button>

        <Typography variant="h3" component="h1" gutterBottom>
          {lesson.title}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <Chip label={lesson.difficulty} color="primary" />
          <Chip label={lesson.category} variant="outlined" />
          <Chip label={`${lesson.estimatedTime} min`} variant="outlined" />
          <Chip label={`${lesson.xp} XP`} color="secondary" />
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {lesson.description}
        </Typography>

        {/* Progress */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Progress: {Math.round(progress * 100)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        {/* Prerequisites */}
        {lesson.prerequisites && lesson.prerequisites.length > 0 && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Prerequisites:</strong> Make sure you've completed lessons {lesson.prerequisites.join(', ')} before starting this lesson.
            </Typography>
          </Alert>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
        {/* Main Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Vocabulary Section */}
          {lesson.vocabulary.length > 0 && (
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BookIcon /> New Vocabulary
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
                  {lesson.vocabulary.map((word, index) => (
                    <Paper key={index} sx={{ p: 2, height: '100%' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {word.word}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {word.partOfSpeech}
                      </Typography>
                      <Typography variant="body1">
                        {word.definition}
                      </Typography>
                      {word.examples && word.examples.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Example: {word.examples[0]}
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Lesson Content Sections */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Lesson Content
              </Typography>
              {lesson.sections.map((section, index) => (
                <Accordion
                  key={index}
                  expanded={currentSection === index}
                  onChange={() => setCurrentSection(index)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">
                      {index + 1}. {section.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
                      {section.content}
                    </Typography>
                    {section.examples && section.examples.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Examples:
                        </Typography>
                        <List>
                          {section.examples.map((example, exIndex) => (
                            <ListItem key={exIndex} sx={{ pl: 0 }}>
                              <ListItemText
                                primary={typeof example === 'string' ? example : example}
                                primaryTypographyProps={{ fontWeight: 600 }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>

          {/* Exercises */}
          {lesson.exercises.length > 0 && (
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <QuizIcon /> Practice Exercises
                </Typography>
                {lesson.exercises.map((exercise, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Typography variant="h6">
                        Exercise {index + 1}: {exercise.type}
                      </Typography>
                      {completedExercises.includes(index) && (
                        <CheckCircleIcon sx={{ color: 'success.main' }} />
                      )}
                    </Box>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {exercise.question}
                    </Typography>

                    {/* Show the exercise options if available */}
                    {exercise.options && exercise.options.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        {exercise.options.map((option, optIndex) => (
                          <Paper key={optIndex} sx={{ p: 2, mb: 1, bgcolor: 'grey.50' }}>
                            <Typography variant="body2">
                              {optIndex + 1}. {option}
                            </Typography>
                          </Paper>
                        ))}
                      </Box>
                    )}

                    {/* Show the correct answer */}
                    <Paper sx={{ p: 2, mb: 2, bgcolor: 'success.50', border: 1, borderColor: 'success.main' }}>
                      <Typography variant="body2" color="success.dark">
                        <strong>Answer:</strong> {exercise.answer}
                      </Typography>
                    </Paper>

                    <Button
                      variant={completedExercises.includes(index) ? "outlined" : "contained"}
                      onClick={() => handleCompleteExercise(index)}
                      sx={{ mt: 1 }}
                      startIcon={completedExercises.includes(index) ? <CheckCircleIcon /> : <PlayArrowIcon />}
                    >
                      {completedExercises.includes(index) ? 'Completed' : 'Mark Complete'}
                    </Button>
                    {index < lesson.exercises.length - 1 && <Divider sx={{ mt: 3 }} />}
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}
        </Box>

        {/* Sidebar */}
        <Box sx={{ width: { xs: '100%', lg: '350px' } }}>
          {/* Cultural Notes */}
          {lesson.culturalNotes && lesson.culturalNotes.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🌍 Cultural Notes
                </Typography>
                {lesson.culturalNotes.map((note, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                    • {note}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📊 Lesson Stats
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  <strong>Sections:</strong> {lesson.sections.length}
                </Typography>
                <Typography variant="body2">
                  <strong>Exercises:</strong> {lesson.exercises.length}
                </Typography>
                <Typography variant="body2">
                  <strong>New Words:</strong> {lesson.vocabulary.length}
                </Typography>
                <Typography variant="body2">
                  <strong>Estimated Time:</strong> {lesson.estimatedTime} minutes
                </Typography>
                <Typography variant="body2">
                  <strong>XP Reward:</strong> {lesson.xp} points
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📚 Navigation
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/lessons')}
                  startIcon={<ArrowBackIcon />}
                >
                  Back to All Lessons
                </Button>
                {lesson.id > 1 && (
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate(`/lessons/${lesson.id - 1}`)}
                  >
                    Previous Lesson
                  </Button>
                )}
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate(`/lessons/${lesson.id + 1}`)}
                >
                  Next Lesson
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default LessonDetailPage;