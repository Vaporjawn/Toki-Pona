import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
  Stack,
  Chip,
  Divider,
  Button,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import TranslateIcon from '@mui/icons-material/Translate';

import { translate } from '../utils/translatorEngine';
import type { TranslationMode, Direction } from '../utils/translatorEngine';

const DEBOUNCE_MS = 160;

const modes: TranslationMode[] = ['word', 'sentence', 'grammar'];

const TranslatorPage: React.FC = () => {
  const { t } = useTranslation();
  const [sourceText, setSourceText] = useState('');
  const [direction, setDirection] = useState<Direction | undefined>(undefined); // undefined => auto
  const [mode, setMode] = useState<TranslationMode>('word');
  const [output, setOutput] = useState('');
  const [autoDetected, setAutoDetected] = useState<boolean>(true);
  const [unknownWords, setUnknownWords] = useState<string[]>([]);
  const [lastDetectedDirection, setLastDetectedDirection] = useState<Direction>('tp-en');

  // Debounce mechanism
  useEffect(() => {
    const handle = setTimeout(() => {
      if (!sourceText.trim()) {
        setOutput('');
        setUnknownWords([]);
        return;
      }
      const result = translate(sourceText, { mode, direction });
      setOutput(result.output);
      setUnknownWords(result.unknownWords);
      setAutoDetected(result.autoDetected);
      setLastDetectedDirection(result.direction);
    }, DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [sourceText, direction, mode]);

  const handleSwapDirection = useCallback(() => {
    setDirection(prev => {
      if (!prev) {
        // if auto: pick the opposite of last detected
        return lastDetectedDirection === 'tp-en' ? 'en-tp' : 'tp-en';
      }
      return prev === 'tp-en' ? 'en-tp' : 'tp-en';
    });
    // Also swap source/output text for convenience if output exists
    setSourceText(prev => (output ? output : prev));
  }, [lastDetectedDirection, output]);

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).catch(() => {});
  }, [output]);

  const handleClear = useCallback(() => {
    setSourceText('');
    setOutput('');
    setUnknownWords([]);
  }, []);

  const directionLabel = useMemo(() => {
    const dir = direction || lastDetectedDirection;
    if (dir === 'tp-en') return t('translator.direction.tpToEn');
    return t('translator.direction.enToTp');
  }, [direction, lastDetectedDirection, t]);

  const autoIndicator = autoDetected && !direction ? (
    <Tooltip title={t('translator.direction.autoDetected')}>
      <GpsFixedIcon color="primary" fontSize="small" style={{ marginLeft: 4 }} />
    </Tooltip>
  ) : null;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <TranslateIcon /> {t('translator.title')}
      </Typography>

      <Card variant="outlined">
        <CardContent>
          <Stack spacing={3}>
            {/* Mode Selection */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                {t('translator.modes')}
              </Typography>
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={(_, val) => val && setMode(val)}
                size="small"
              >
                {modes.map(m => (
                  <ToggleButton key={m} value={m}>
                    {t(`translator.mode.${m}`)}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              {mode !== 'grammar' && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  {t('translator.partialWarning')}
                </Typography>
              )}
            </Box>

            {/* Direction & Actions */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {directionLabel}
                </Typography>
                {autoIndicator}
                <Tooltip title={t('translator.swap')}>
                  <IconButton onClick={handleSwapDirection} size="small" color="primary">
                    <SwapHorizIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('translator.copy')}>
                  <span>
                    <IconButton onClick={handleCopy} size="small" disabled={!output} color="primary">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title={t('translator.clear')}>
                  <IconButton onClick={handleClear} size="small" color="warning">
                    <ClearAllIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant={direction === undefined ? 'contained' : 'outlined'}
                  onClick={() => setDirection(undefined)}
                >
                  {t('translator.direction.auto')}
                </Button>
                <Button
                  size="small"
                  variant={direction === 'tp-en' ? 'contained' : 'outlined'}
                  onClick={() => setDirection('tp-en')}
                >
                  {t('translator.direction.tpToEn')}
                </Button>
                <Button
                  size="small"
                  variant={direction === 'en-tp' ? 'contained' : 'outlined'}
                  onClick={() => setDirection('en-tp')}
                >
                  {t('translator.direction.enToTp')}
                </Button>
              </Stack>
            </Stack>

            {/* Text Areas */}
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="stretch">
              <TextField
                label={t('translator.direction.source')}
                placeholder={t('translator.sourcePlaceholder') || ''}
                value={sourceText}
                onChange={e => setSourceText(e.target.value)}
                multiline
                minRows={6}
                fullWidth
              />
              <TextField
                label={t('translator.direction.target')}
                placeholder={t('translator.targetPlaceholder') || ''}
                value={output}
                multiline
                minRows={6}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Stack>

            {/* Unknown Words */}
            {unknownWords.length > 0 && (
              <Box>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  {t('translator.unknownWord')}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {unknownWords.map(w => (
                    <Chip key={w} label={w} size="small" color="default" />
                  ))}
                </Box>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TranslatorPage;
