import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Stack,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Speed as SpeedIcon,
  EmojiEvents as TrophyIcon,
  LocalFireDepartment as StreakIcon,
  Schedule as TimeIcon,
  Psychology as BrainIcon,
  Analytics as AnalyticsIcon,
  Star as StarIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

// Mock data types for analytics
interface WordStats {
  word: string;
  definition: string;
  timesCorrect: number;
  timesIncorrect: number;
  averageResponseTime: number;
  lastPracticed: Date;
  masteryLevel: number;
  streak: number;
}

interface PracticeSession {
  id: string;
  mode: string;
  date: Date;
  duration: number;
  wordsAttempted: number;
  correctAnswers: number;
  accuracy: number;
  xpEarned: number;
  averageResponseTime: number;
  newWordsLearned: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  target: number;
  unlockedDate?: Date;
}

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Mock data generation
  const mockWordStats = useMemo((): WordStats[] => {
    const words = ['jan', 'mi', 'sina', 'ona', 'ni', 'li', 'e', 'la', 'pi', 'a'];
    return words.map(word => ({
      word,
      definition: `Definition of ${word}`,
      timesCorrect: Math.floor(Math.random() * 50) + 10,
      timesIncorrect: Math.floor(Math.random() * 20) + 1,
      averageResponseTime: Math.random() * 3000 + 1000,
      lastPracticed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      masteryLevel: Math.random() * 100,
      streak: Math.floor(Math.random() * 15),
    }));
  }, []);

  const mockSessions = useMemo((): PracticeSession[] => {
    const modes = ['Quick Review', 'Random Quiz', 'Speed Practice'];
    return Array.from({ length: 15 }, (_, i) => ({
      id: `session-${i}`,
      mode: modes[Math.floor(Math.random() * modes.length)],
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      duration: Math.floor(Math.random() * 600) + 120,
      wordsAttempted: Math.floor(Math.random() * 20) + 5,
      correctAnswers: Math.floor(Math.random() * 15) + 3,
      accuracy: Math.random() * 40 + 60,
      xpEarned: Math.floor(Math.random() * 200) + 50,
      averageResponseTime: Math.random() * 2000 + 1000,
      newWordsLearned: Math.floor(Math.random() * 3),
    }));
  }, []);

  const mockAchievements = useMemo((): Achievement[] => [
    {
      id: 'first-steps',
      name: 'First Steps',
      description: 'Complete your first practice session',
      icon: <StarIcon />,
      unlocked: true,
      progress: 1,
      target: 1,
      unlockedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'word-master',
      name: 'Word Master',
      description: 'Master 50 words',
      icon: <SchoolIcon />,
      unlocked: false,
      progress: 23,
      target: 50,
    },
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      description: 'Complete a practice session in under 30 seconds',
      icon: <SpeedIcon />,
      unlocked: true,
      progress: 1,
      target: 1,
      unlockedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'streak-keeper',
      name: 'Streak Keeper',
      description: 'Practice for 7 days in a row',
      icon: <StreakIcon />,
      unlocked: false,
      progress: 3,
      target: 7,
    },
  ], []);

  // Calculate key metrics
  const totalXP = mockSessions.reduce((sum, session) => sum + session.xpEarned, 0);
  const wordsMastered = mockWordStats.filter(word => word.masteryLevel > 80).length;
  const currentStreak = 3; // Mock streak
  const totalPracticeTime = mockSessions.reduce((sum, session) => sum + session.duration, 0);

  const handleExport = () => {
    const data = {
      keyMetrics: { totalXP, wordsMastered, currentStreak, totalPracticeTime },
      wordStats: mockWordStats,
      sessions: mockSessions,
      achievements: mockAchievements,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toki-pona-analytics-${timeRange}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AnalyticsIcon />
            Learning Analytics
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <ToggleButtonGroup
              value={timeRange}
              exclusive
              onChange={(_, value) => value && setTimeRange(value)}
              size="small"
            >
              <ToggleButton value="7d">7D</ToggleButton>
              <ToggleButton value="30d">30D</ToggleButton>
              <ToggleButton value="90d">90D</ToggleButton>
            </ToggleButtonGroup>
            <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport}>
              Export
            </Button>
          </Stack>
        </Stack>

        {/* Key Metrics Cards */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <TrophyIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div">
                    {totalXP.toLocaleString()}
                  </Typography>
                  <Typography color="text.secondary">Total XP</Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16 }} />
                    <Typography variant="body2" color="success.main">
                      +12% this week
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <SchoolIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div">
                    {wordsMastered}
                  </Typography>
                  <Typography color="text.secondary">Words Mastered</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(wordsMastered / 100) * 100}
                    sx={{ mt: 1, width: 120 }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <StreakIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div">
                    {currentStreak}
                  </Typography>
                  <Typography color="text.secondary">Day Streak</Typography>
                  <Chip
                    label="Keep it up!"
                    size="small"
                    color="warning"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <TimeIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div">
                    {Math.round(totalPracticeTime / 60)}m
                  </Typography>
                  <Typography color="text.secondary">Practice Time</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {timeRange} total
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        {/* Progress Overview */}
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Progress Overview</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              <Paper sx={{ p: 3, flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Performance Metrics
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Average Accuracy
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={85}
                      sx={{ mt: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" sx={{ mt: 0.5 }}>85%</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Response Speed
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={72}
                      color="warning"
                      sx={{ mt: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" sx={{ mt: 0.5 }}>1.8s avg</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Vocabulary Mastery
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={wordsMastered}
                      color="success"
                      sx={{ mt: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {wordsMastered}/100 words
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3, flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Weekly Progress
                </Typography>
                <Stack spacing={2}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <Stack key={day} direction="row" alignItems="center" spacing={2}>
                      <Typography variant="body2" sx={{ minWidth: 40 }}>
                        {day}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.random() * 100}
                        sx={{ flex: 1, height: 6, borderRadius: 3 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {Math.floor(Math.random() * 60)}m
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Vocabulary Mastery */}
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Vocabulary Mastery</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {mockWordStats.slice(0, 10).map((wordStat) => (
                <ListItem key={wordStat.word}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: wordStat.masteryLevel > 80 ? 'success.main' : 'grey.400' }}>
                      {wordStat.masteryLevel > 80 ? <CheckIcon /> : <CancelIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="h6">{wordStat.word}</Typography>
                        <Chip
                          label={`${Math.round(wordStat.masteryLevel)}%`}
                          size="small"
                          color={wordStat.masteryLevel > 80 ? 'success' : 'default'}
                        />
                      </Stack>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {wordStat.definition}
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                          <Typography variant="caption">
                            ✓ {wordStat.timesCorrect} | ✗ {wordStat.timesIncorrect}
                          </Typography>
                          <Typography variant="caption">
                            🔥 {wordStat.streak} streak
                          </Typography>
                          <Typography variant="caption">
                            ⏱ {(wordStat.averageResponseTime / 1000).toFixed(1)}s avg
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={wordStat.masteryLevel}
                          sx={{ mt: 1, height: 4, borderRadius: 2 }}
                          color={wordStat.masteryLevel > 80 ? 'success' : 'primary'}
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Recent Practice Sessions */}
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Recent Practice Sessions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {mockSessions.slice(0, 8).map((session) => (
                <ListItem key={session.id}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <BrainIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle1">{session.mode}</Typography>
                        <Chip
                          label={`${Math.round(session.accuracy)}%`}
                          size="small"
                          color={session.accuracy > 80 ? 'success' : session.accuracy > 60 ? 'warning' : 'error'}
                        />
                      </Stack>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {session.date.toLocaleDateString()} • {Math.round(session.duration / 60)} min
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                          <Typography variant="caption">
                            📚 {session.wordsAttempted} words
                          </Typography>
                          <Typography variant="caption">
                            🎯 {session.correctAnswers}/{session.wordsAttempted}
                          </Typography>
                          <Typography variant="caption">
                            ⭐ +{session.xpEarned} XP
                          </Typography>
                          <Typography variant="caption">
                            ⏱ {(session.averageResponseTime / 1000).toFixed(1)}s avg
                          </Typography>
                          {session.newWordsLearned > 0 && (
                            <Typography variant="caption" sx={{ color: 'success.main' }}>
                              🆕 {session.newWordsLearned} new
                            </Typography>
                          )}
                        </Stack>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Achievements Preview */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Achievement Progress</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              {mockAchievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  sx={{
                    flex: 1,
                    bgcolor: achievement.unlocked ? 'success.light' : 'grey.100',
                    opacity: achievement.unlocked ? 1 : 0.7
                  }}
                >
                  <CardContent>
                    <Stack alignItems="center" spacing={2}>
                      <Avatar
                        sx={{
                          bgcolor: achievement.unlocked ? 'success.main' : 'grey.400',
                          width: 56,
                          height: 56
                        }}
                      >
                        {achievement.icon}
                      </Avatar>
                      <Typography variant="h6" align="center">
                        {achievement.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center">
                        {achievement.description}
                      </Typography>
                      {!achievement.unlocked && (
                        <Box sx={{ width: '100%' }}>
                          <LinearProgress
                            variant="determinate"
                            value={(achievement.progress / achievement.target) * 100}
                            sx={{ mb: 1 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {achievement.progress}/{achievement.target}
                          </Typography>
                        </Box>
                      )}
                      {achievement.unlocked && achievement.unlockedDate && (
                        <Chip
                          label={`Unlocked ${achievement.unlockedDate.toLocaleDateString()}`}
                          size="small"
                          color="success"
                        />
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};