import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Switch,
  Select,
  MenuItem,
  Slider,
  Divider,
  Button,
  Alert,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Palette as PaletteIcon,
  VolumeUp as AudioIcon,
  Quiz as PracticeIcon,
  Analytics as AnalyticsIcon,
  Storage as DataIcon,
  ExpandMore as ExpandMoreIcon,
  Download as ExportIcon,
  Upload as ImportIcon,
  Delete as ClearIcon,
} from '@mui/icons-material';
import { useTheme } from '../hooks/useTheme';
import { useProgress } from '../hooks/useProgress';

// Available languages for the interface
const availableLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
];

export const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { state: progressState, dispatch } = useProgress();

  // Local state for settings
  const [audioSettings, setAudioSettings] = useState({
    speechRecognitionEnabled: true,
    textToSpeechEnabled: true,
    speechRate: 1.0,
    speechPitch: 1.0,
    speechVolume: 1.0,
    pronunciationFeedback: true,
    confidenceThreshold: 0.7,
  });

  const [practiceSettings, setPracticeSettings] = useState({
    defaultDifficulty: 'medium',
    timeLimit: true,
    timeLimitSeconds: 30,
    showHints: true,
    autoAdvance: false,
    randomOrder: true,
    practiceReminders: true,
    dailyGoal: 100,
  });

  const [interfaceSettings, setInterfaceSettings] = useState({
    compactMode: false,
    showProgressBars: true,
    animationsEnabled: true,
    soundEffects: true,
    notifications: true,
    hapticFeedback: true,
  });

  const [dataSettings, setDataSettings] = useState({
    autoSave: true,
    cloudSync: false,
    analytics: true,
    crashReporting: true,
  });

  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [showImportSuccess, setShowImportSuccess] = useState(false);

  // Handlers
  const handleAudioSettingChange = useCallback((setting: string, value: boolean | number) => {
    setAudioSettings(prev => ({ ...prev, [setting]: value }));
  }, []);

  const handlePracticeSettingChange = useCallback((setting: string, value: boolean | number | string) => {
    setPracticeSettings(prev => ({ ...prev, [setting]: value }));
  }, []);

  const handleInterfaceSettingChange = useCallback((setting: string, value: boolean) => {
    setInterfaceSettings(prev => ({ ...prev, [setting]: value }));
  }, []);

  const handleDataSettingChange = useCallback((setting: string, value: boolean) => {
    setDataSettings(prev => ({ ...prev, [setting]: value }));
  }, []);

  const handleExportData = useCallback(() => {
    const exportData = {
      progress: progressState.userProgress,
      audioSettings,
      practiceSettings,
      interfaceSettings,
      exportedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `toki-pona-backup-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  }, [progressState.userProgress, audioSettings, practiceSettings, interfaceSettings]);

  const handleImportData = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);

        // Import progress data
        if (importedData.progress) {
          dispatch({ type: 'IMPORT_PROGRESS', payload: importedData.progress });
        }

        // Import settings
        if (importedData.audioSettings) {
          setAudioSettings(importedData.audioSettings);
        }
        if (importedData.practiceSettings) {
          setPracticeSettings(importedData.practiceSettings);
        }
        if (importedData.interfaceSettings) {
          setInterfaceSettings(importedData.interfaceSettings);
        }

        setShowImportSuccess(true);
        setTimeout(() => setShowImportSuccess(false), 3000);
      } catch (error) {
        console.error('Failed to import data:', error);
      }
    };
    reader.readAsText(file);
  }, [dispatch]);

  const handleResetProgress = useCallback(() => {
    if (window.confirm(t('settings.confirm_reset', 'Are you sure you want to reset all progress? This cannot be undone.'))) {
      dispatch({ type: 'RESET_ALL_PROGRESS' });
    }
  }, [dispatch, t]);

  const isDarkMode = darkMode;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <SettingsIcon sx={{ fontSize: 32 }} />
        <Typography variant="h4" component="h1">
          {t('settings.title', 'Settings')}
        </Typography>
      </Box>

      {/* Theme & Language Settings */}
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PaletteIcon />
            <Typography variant="h6">
              {t('settings.theme_language', 'Theme & Language')}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={3}>
            <Box>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">
                  {t('settings.theme', 'Theme')}
                </FormLabel>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                    />
                  }
                  label={isDarkMode ? t('settings.dark_mode', 'Dark Mode') : t('settings.light_mode', 'Light Mode')}
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl fullWidth>
                <FormLabel component="legend">
                  {t('settings.language', 'Interface Language')}
                </FormLabel>
                <Select
                  value={i18n.language}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  size="small"
                  sx={{ mt: 1 }}
                >
                  {availableLanguages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.name})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Audio Settings */}
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AudioIcon />
            <Typography variant="h6">
              {t('settings.audio', 'Audio & Pronunciation')}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                {t('settings.speech_features', 'Speech Features')}
              </Typography>
              <Stack spacing={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={audioSettings.speechRecognitionEnabled}
                      onChange={(e) => handleAudioSettingChange('speechRecognitionEnabled', e.target.checked)}
                    />
                  }
                  label={t('settings.speech_recognition', 'Enable Speech Recognition')}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={audioSettings.textToSpeechEnabled}
                      onChange={(e) => handleAudioSettingChange('textToSpeechEnabled', e.target.checked)}
                    />
                  }
                  label={t('settings.text_to_speech', 'Enable Text-to-Speech')}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={audioSettings.pronunciationFeedback}
                      onChange={(e) => handleAudioSettingChange('pronunciationFeedback', e.target.checked)}
                    />
                  }
                  label={t('settings.pronunciation_feedback', 'Pronunciation Feedback')}
                />
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                {t('settings.speech_parameters', 'Speech Parameters')}
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2">
                    {t('settings.speech_rate', 'Speech Rate')} ({audioSettings.speechRate.toFixed(1)}x)
                  </Typography>
                  <Slider
                    value={audioSettings.speechRate}
                    onChange={(_, value) => handleAudioSettingChange('speechRate', value as number)}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    marks
                    valueLabelDisplay="auto"
                  />
                </Box>

                <Box>
                  <Typography variant="body2">
                    {t('settings.speech_pitch', 'Speech Pitch')} ({audioSettings.speechPitch.toFixed(1)})
                  </Typography>
                  <Slider
                    value={audioSettings.speechPitch}
                    onChange={(_, value) => handleAudioSettingChange('speechPitch', value as number)}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    marks
                    valueLabelDisplay="auto"
                  />
                </Box>

                <Box>
                  <Typography variant="body2">
                    {t('settings.confidence_threshold', 'Recognition Confidence Threshold')} ({(audioSettings.confidenceThreshold * 100).toFixed(0)}%)
                  </Typography>
                  <Slider
                    value={audioSettings.confidenceThreshold}
                    onChange={(_, value) => handleAudioSettingChange('confidenceThreshold', value as number)}
                    min={0.1}
                    max={1.0}
                    step={0.05}
                    marks
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${(value * 100).toFixed(0)}%`}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Practice Settings */}
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PracticeIcon />
            <Typography variant="h6">
              {t('settings.practice', 'Practice & Learning')}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={3}>
            <Box>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">
                  {t('settings.default_difficulty', 'Default Difficulty')}
                </FormLabel>
                <RadioGroup
                  value={practiceSettings.defaultDifficulty}
                  onChange={(e) => handlePracticeSettingChange('defaultDifficulty', e.target.value)}
                >
                  <FormControlLabel
                    value="easy"
                    control={<Radio />}
                    label={t('settings.difficulty_easy', 'Easy')}
                  />
                  <FormControlLabel
                    value="medium"
                    control={<Radio />}
                    label={t('settings.difficulty_medium', 'Medium')}
                  />
                  <FormControlLabel
                    value="hard"
                    control={<Radio />}
                    label={t('settings.difficulty_hard', 'Hard')}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                {t('settings.practice_options', 'Practice Options')}
              </Typography>
              <Stack spacing={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={practiceSettings.timeLimit}
                      onChange={(e) => handlePracticeSettingChange('timeLimit', e.target.checked)}
                    />
                  }
                  label={t('settings.enable_time_limit', 'Enable Time Limit')}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={practiceSettings.showHints}
                      onChange={(e) => handlePracticeSettingChange('showHints', e.target.checked)}
                    />
                  }
                  label={t('settings.show_hints', 'Show Hints')}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={practiceSettings.autoAdvance}
                      onChange={(e) => handlePracticeSettingChange('autoAdvance', e.target.checked)}
                    />
                  }
                  label={t('settings.auto_advance', 'Auto-advance After Correct Answer')}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={practiceSettings.randomOrder}
                      onChange={(e) => handlePracticeSettingChange('randomOrder', e.target.checked)}
                    />
                  }
                  label={t('settings.random_order', 'Random Question Order')}
                />
              </Stack>
            </Box>

            {practiceSettings.timeLimit && (
              <Box>
                <Typography variant="body2" gutterBottom>
                  {t('settings.time_limit_seconds', 'Time Limit (seconds)')} ({practiceSettings.timeLimitSeconds}s)
                </Typography>
                <Slider
                  value={practiceSettings.timeLimitSeconds}
                  onChange={(_, value) => handlePracticeSettingChange('timeLimitSeconds', value as number)}
                  min={10}
                  max={120}
                  step={5}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>
            )}

            <Box>
              <Typography variant="body2" gutterBottom>
                {t('settings.daily_xp_goal', 'Daily XP Goal')} ({practiceSettings.dailyGoal} XP)
              </Typography>
              <Slider
                value={practiceSettings.dailyGoal}
                onChange={(_, value) => handlePracticeSettingChange('dailyGoal', value as number)}
                min={50}
                max={500}
                step={25}
                marks
                valueLabelDisplay="auto"
              />
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Interface Settings */}
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AnalyticsIcon />
            <Typography variant="h6">
              {t('settings.interface', 'Interface & Experience')}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={interfaceSettings.compactMode}
                  onChange={(e) => handleInterfaceSettingChange('compactMode', e.target.checked)}
                />
              }
              label={t('settings.compact_mode', 'Compact Mode')}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={interfaceSettings.showProgressBars}
                  onChange={(e) => handleInterfaceSettingChange('showProgressBars', e.target.checked)}
                />
              }
              label={t('settings.show_progress_bars', 'Show Progress Bars')}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={interfaceSettings.animationsEnabled}
                  onChange={(e) => handleInterfaceSettingChange('animationsEnabled', e.target.checked)}
                />
              }
              label={t('settings.animations', 'Enable Animations')}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={interfaceSettings.soundEffects}
                  onChange={(e) => handleInterfaceSettingChange('soundEffects', e.target.checked)}
                />
              }
              label={t('settings.sound_effects', 'Sound Effects')}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={interfaceSettings.notifications}
                  onChange={(e) => handleInterfaceSettingChange('notifications', e.target.checked)}
                />
              }
              label={t('settings.notifications', 'Practice Reminders')}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={interfaceSettings.hapticFeedback}
                  onChange={(e) => handleInterfaceSettingChange('hapticFeedback', e.target.checked)}
                />
              }
              label={t('settings.haptic_feedback', 'Haptic Feedback (Mobile)')}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Data & Backup Settings */}
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DataIcon />
            <Typography variant="h6">
              {t('settings.data_backup', 'Data & Backup')}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                {t('settings.data_options', 'Data Options')}
              </Typography>
              <Stack spacing={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={dataSettings.autoSave}
                      onChange={(e) => handleDataSettingChange('autoSave', e.target.checked)}
                    />
                  }
                  label={t('settings.auto_save', 'Auto-save Progress')}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={dataSettings.analytics}
                      onChange={(e) => handleDataSettingChange('analytics', e.target.checked)}
                    />
                  }
                  label={t('settings.anonymous_analytics', 'Anonymous Analytics')}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={dataSettings.crashReporting}
                      onChange={(e) => handleDataSettingChange('crashReporting', e.target.checked)}
                    />
                  }
                  label={t('settings.crash_reporting', 'Crash Reporting')}
                />
              </Stack>
            </Box>

            <Divider />

            {/* Progress Overview */}
            <Box>
              <Typography variant="h6" gutterBottom>
                {t('settings.progress_overview', 'Progress Overview')}
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2, mb: 2 }}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {progressState.userProgress.lessonsProgress.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('settings.lessons_completed', 'Lessons')}
                    </Typography>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {progressState.userProgress.vocabularyMastered.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('settings.words_learned', 'Words Learned')}
                    </Typography>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {progressState.userProgress.currentStreak}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('settings.current_streak', 'Current Streak')}
                    </Typography>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {progressState.userProgress.totalXP}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('settings.total_xp', 'Total XP')}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            <Divider />

            {/* Backup & Import/Export */}
            <Box>
              <Typography variant="h6" gutterBottom>
                {t('settings.backup_restore', 'Backup & Restore')}
              </Typography>

              {showExportSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {t('settings.export_success', 'Data exported successfully!')}
                </Alert>
              )}

              {showImportSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {t('settings.import_success', 'Data imported successfully!')}
                </Alert>
              )}

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<ExportIcon />}
                  onClick={handleExportData}
                  fullWidth
                >
                  {t('settings.export_data', 'Export Data')}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<ImportIcon />}
                  component="label"
                  fullWidth
                >
                  {t('settings.import_data', 'Import Data')}
                  <input
                    type="file"
                    hidden
                    accept=".json"
                    onChange={handleImportData}
                  />
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<ClearIcon />}
                  onClick={handleResetProgress}
                  fullWidth
                >
                  {t('settings.reset_progress', 'Reset Progress')}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SettingsPage;