import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Tooltip,
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'tok', name: 'Toki Pona', nativeName: 'toki pona', flag: '🌍' },
  { code: 'zh-CN', name: 'Chinese Simplified', nativeName: '中文 (简体)', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'eo', name: 'Esperanto', nativeName: 'Esperanto', flag: '🌟' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  // Placeholder locales (UI strings cloned from English until translated)
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', flag: '🇵🇭' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
];

interface LanguageSelectorProps {
  /**
   * Optional custom styling for the IconButton
   */
  iconButtonProps?: Record<string, unknown>;
  /**
   * Whether to show the tooltip
   */
  showTooltip?: boolean;
  /**
   * Custom tooltip text (falls back to translated text)
   */
  tooltipText?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  iconButtonProps = {},
  showTooltip = true,
  tooltipText,
}) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    handleMenuClose();
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === i18n.language) || languages[0];
  };

  const currentLanguage = getCurrentLanguage();
  const defaultTooltip = `${t('nav.changeLanguage', 'Change Language')} (${currentLanguage.nativeName})`;

  const iconButton = (
    <IconButton
      onClick={handleMenuOpen}
      color="inherit"
      aria-label={defaultTooltip}
      {...iconButtonProps}
    >
      <LanguageIcon />
    </IconButton>
  );

  return (
    <>
      {showTooltip ? (
        <Tooltip title={tooltipText || defaultTooltip}>
          {iconButton}
        </Tooltip>
      ) : (
        iconButton
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 200,
            mt: 1,
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={i18n.language === language.code}
            sx={{
              py: 1.5,
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Typography variant="h6" component="span" sx={{ fontSize: '1.2rem' }}>
                {language.flag}
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {language.nativeName}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: i18n.language === language.code ? 'inherit' : 'text.secondary',
                    opacity: 0.8
                  }}
                >
                  {language.name}
                </Typography>
              </Box>
              {i18n.language === language.code && (
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  ✓
                </Typography>
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelector;