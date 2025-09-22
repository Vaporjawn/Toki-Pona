import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Language as LanguageIcon,
  Home as HomeIcon,
  MenuBook as LessonsIcon,
  Book as DictionaryIcon,
  Quiz as PracticeIcon,
  Info as AboutIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const [languageAnchor, setLanguageAnchor] = useState<null | HTMLElement>(null);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchor(null);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    handleLanguageMenuClose();
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'tok', name: 'toki pona', flag: '🌍' },
  ];

  const navItems = [
    { path: '/', label: t('nav.home'), icon: <HomeIcon /> },
    { path: '/lessons', label: t('nav.lessons'), icon: <LessonsIcon /> },
    { path: '/dictionary', label: t('nav.dictionary'), icon: <DictionaryIcon /> },
    { path: '/practice', label: t('nav.practice'), icon: <PracticeIcon /> },
    { path: '/about', label: t('nav.about'), icon: <AboutIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 600,
            }}
          >
            toki pona
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Language Selector */}
          <IconButton
            size="large"
            onClick={toggleDarkMode}
            color="inherit"
            sx={{ ml: 1 }}
            title={darkMode ? t('theme.switchToLight') : t('theme.switchToDark')}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <IconButton
            size="large"
            onClick={handleLanguageMenuOpen}
            color="inherit"
            sx={{ ml: 1 }}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={languageAnchor}
            open={Boolean(languageAnchor)}
            onClose={handleLanguageMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {languages.map((language) => (
              <MenuItem
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                selected={i18n.language === language.code}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          maxWidth: '100%',
          px: { xs: 2, sm: 3, md: 4 },
          py: 3,
        }}
      >
        {children}
      </Box>

      {/* Mobile Navigation */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: 'flex', width: '100%' }}>
          {navItems.slice(0, 4).map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                flex: 1,
                flexDirection: 'column',
                py: 1,
                minWidth: 'auto',
                color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
              }}
            >
              {item.icon}
              <Typography variant="caption" sx={{ mt: 0.5, fontSize: '0.7rem' }}>
                {item.label}
              </Typography>
            </Button>
          ))}
        </Box>
      </Box>

      {/* Add bottom padding for mobile navigation */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, height: 64 }} />
    </Box>
  );
};

export default Layout;