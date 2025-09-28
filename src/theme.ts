import { createTheme } from '@mui/material/styles';

// Define custom palette colors for Toki Pona theme
declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      primary: string;
      secondary: string;
      accent: string;
    };
  }

  interface PaletteOptions {
    gradient?: {
      primary?: string;
      secondary?: string;
      accent?: string;
    };
  }
}

// Common theme options
const getDesignTokens = (mode: 'light' | 'dark'): Parameters<typeof createTheme>[0] => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#2E7D32' : '#4CAF50', // Deep green to bright green
      light: mode === 'light' ? '#4CAF50' : '#81C784',
      dark: mode === 'light' ? '#1B5E20' : '#2E7D32',
      contrastText: '#ffffff',
    },
    secondary: {
      main: mode === 'light' ? '#FF6F00' : '#FFB74D', // Orange accent
      light: mode === 'light' ? '#FF9800' : '#FFCC02',
      dark: mode === 'light' ? '#E65100' : '#FF8F00',
      contrastText: mode === 'light' ? '#ffffff' : '#000000',
    },
    background: {
      default: mode === 'light' ? '#f5f5f5' : '#0a0a0a',
      paper: mode === 'light' ? '#ffffff' : '#121212',
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#ffffff',
      secondary: mode === 'light' ? '#424242' : '#cccccc',
    },
    gradient: {
      primary: mode === 'light'
        ? 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)'
        : 'linear-gradient(135deg, #1B5E20 0%, #4CAF50 100%)',
      secondary: mode === 'light'
        ? 'linear-gradient(135deg, #FF6F00 0%, #FF9800 100%)'
        : 'linear-gradient(135deg, #E65100 0%, #FFB74D 100%)',
      accent: mode === 'light'
        ? 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)'
        : 'linear-gradient(135deg, #1B2F1C 0%, #2E4F2F 100%)',
    },
    divider: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
    action: {
      hover: mode === 'light' ? 'rgba(46, 125, 50, 0.04)' : 'rgba(76, 175, 80, 0.08)',
      selected: mode === 'light' ? 'rgba(46, 125, 50, 0.08)' : 'rgba(76, 175, 80, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: mode === 'light' ? [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1)',
    '0px 1px 5px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.12)',
    '0px 1px 8px rgba(0, 0, 0, 0.1), 0px 3px 4px rgba(0, 0, 0, 0.14)',
    '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 5px rgba(0, 0, 0, 0.14)',
    '0px 3px 5px rgba(0, 0, 0, 0.1), 0px 5px 8px rgba(0, 0, 0, 0.14)',
    '0px 3px 5px rgba(0, 0, 0, 0.1), 0px 6px 10px rgba(0, 0, 0, 0.14)',
    '0px 4px 5px rgba(0, 0, 0, 0.1), 0px 8px 10px rgba(0, 0, 0, 0.14)',
    '0px 5px 6px rgba(0, 0, 0, 0.1), 0px 10px 14px rgba(0, 0, 0, 0.14)',
    '0px 6px 7px rgba(0, 0, 0, 0.1), 0px 12px 16px rgba(0, 0, 0, 0.14)',
    '0px 7px 8px rgba(0, 0, 0, 0.1), 0px 14px 18px rgba(0, 0, 0, 0.14)',
    '0px 8px 9px rgba(0, 0, 0, 0.1), 0px 16px 20px rgba(0, 0, 0, 0.14)',
    '0px 9px 11px rgba(0, 0, 0, 0.1), 0px 18px 22px rgba(0, 0, 0, 0.14)',
    '0px 10px 13px rgba(0, 0, 0, 0.1), 0px 20px 24px rgba(0, 0, 0, 0.14)',
    '0px 11px 15px rgba(0, 0, 0, 0.1), 0px 22px 26px rgba(0, 0, 0, 0.14)',
    '0px 12px 17px rgba(0, 0, 0, 0.1), 0px 24px 28px rgba(0, 0, 0, 0.14)',
    '0px 13px 19px rgba(0, 0, 0, 0.1), 0px 26px 30px rgba(0, 0, 0, 0.14)',
    '0px 14px 21px rgba(0, 0, 0, 0.1), 0px 28px 32px rgba(0, 0, 0, 0.14)',
    '0px 15px 23px rgba(0, 0, 0, 0.1), 0px 30px 34px rgba(0, 0, 0, 0.14)',
    '0px 16px 25px rgba(0, 0, 0, 0.1), 0px 32px 36px rgba(0, 0, 0, 0.14)',
    '0px 17px 27px rgba(0, 0, 0, 0.1), 0px 34px 38px rgba(0, 0, 0, 0.14)',
    '0px 18px 29px rgba(0, 0, 0, 0.1), 0px 36px 40px rgba(0, 0, 0, 0.14)',
    '0px 19px 31px rgba(0, 0, 0, 0.1), 0px 38px 42px rgba(0, 0, 0, 0.14)',
    '0px 20px 33px rgba(0, 0, 0, 0.1), 0px 40px 44px rgba(0, 0, 0, 0.14)',
    '0px 21px 35px rgba(0, 0, 0, 0.1), 0px 42px 46px rgba(0, 0, 0, 0.14)',
  ] : [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 1px 5px rgba(0, 0, 0, 0.24), 0px 2px 4px rgba(0, 0, 0, 0.28)',
    '0px 1px 8px rgba(0, 0, 0, 0.28), 0px 3px 4px rgba(0, 0, 0, 0.32)',
    '0px 2px 4px rgba(0, 0, 0, 0.28), 0px 4px 5px rgba(0, 0, 0, 0.32)',
    '0px 3px 5px rgba(0, 0, 0, 0.28), 0px 5px 8px rgba(0, 0, 0, 0.32)',
    '0px 3px 5px rgba(0, 0, 0, 0.28), 0px 6px 10px rgba(0, 0, 0, 0.32)',
    '0px 4px 5px rgba(0, 0, 0, 0.28), 0px 8px 10px rgba(0, 0, 0, 0.32)',
    '0px 5px 6px rgba(0, 0, 0, 0.28), 0px 10px 14px rgba(0, 0, 0, 0.32)',
    '0px 6px 7px rgba(0, 0, 0, 0.28), 0px 12px 16px rgba(0, 0, 0, 0.32)',
    '0px 7px 8px rgba(0, 0, 0, 0.28), 0px 14px 18px rgba(0, 0, 0, 0.32)',
    '0px 8px 9px rgba(0, 0, 0, 0.28), 0px 16px 20px rgba(0, 0, 0, 0.32)',
    '0px 9px 11px rgba(0, 0, 0, 0.28), 0px 18px 22px rgba(0, 0, 0, 0.32)',
    '0px 10px 13px rgba(0, 0, 0, 0.28), 0px 20px 24px rgba(0, 0, 0, 0.32)',
    '0px 11px 15px rgba(0, 0, 0, 0.28), 0px 22px 26px rgba(0, 0, 0, 0.32)',
    '0px 12px 17px rgba(0, 0, 0, 0.28), 0px 24px 28px rgba(0, 0, 0, 0.32)',
    '0px 13px 19px rgba(0, 0, 0, 0.28), 0px 26px 30px rgba(0, 0, 0, 0.32)',
    '0px 14px 21px rgba(0, 0, 0, 0.28), 0px 28px 32px rgba(0, 0, 0, 0.32)',
    '0px 15px 23px rgba(0, 0, 0, 0.28), 0px 30px 34px rgba(0, 0, 0, 0.32)',
    '0px 16px 25px rgba(0, 0, 0, 0.28), 0px 32px 36px rgba(0, 0, 0, 0.32)',
    '0px 17px 27px rgba(0, 0, 0, 0.28), 0px 34px 38px rgba(0, 0, 0, 0.32)',
    '0px 18px 29px rgba(0, 0, 0, 0.28), 0px 36px 40px rgba(0, 0, 0, 0.32)',
    '0px 19px 31px rgba(0, 0, 0, 0.28), 0px 38px 42px rgba(0, 0, 0, 0.32)',
    '0px 20px 33px rgba(0, 0, 0, 0.28), 0px 40px 44px rgba(0, 0, 0, 0.32)',
    '0px 21px 35px rgba(0, 0, 0, 0.28), 0px 42px 46px rgba(0, 0, 0, 0.32)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: mode === 'light' ? '#c4c4c4 transparent' : '#666 transparent',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: 'transparent',
            width: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: mode === 'light' ? '#c4c4c4' : '#666',
            minHeight: 24,
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: mode === 'light' ? '#a0a0a0' : '#999',
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: mode === 'light' ? '#a0a0a0' : '#999',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: mode === 'light' ? '#a0a0a0' : '#999',
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 500,
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: mode === 'light'
              ? '0px 2px 8px rgba(46, 125, 50, 0.2)'
              : '0px 2px 8px rgba(76, 175, 80, 0.3)',
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          background: mode === 'light'
            ? 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)'
            : 'linear-gradient(135deg, #1B5E20 0%, #4CAF50 100%)',
          color: '#ffffff',
          '&:hover': {
            background: mode === 'light'
              ? 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)'
              : 'linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%)',
          },
        },
        outlined: {
          borderWidth: 2,
          backgroundColor: mode === 'light' ? 'transparent' : 'transparent',
          color: mode === 'light' ? '#2E7D32' : '#4CAF50',
          borderColor: mode === 'light' ? '#2E7D32' : '#4CAF50',
          '&:hover': {
            borderWidth: 2,
            backgroundColor: mode === 'light' ? 'rgba(46, 125, 50, 0.04)' : 'rgba(76, 175, 80, 0.08)',
          },
        },
        text: {
          color: mode === 'light' ? '#2E7D32' : '#4CAF50',
          '&:hover': {
            backgroundColor: mode === 'light' ? 'rgba(46, 125, 50, 0.04)' : 'rgba(76, 175, 80, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)'}`,
          backgroundImage: 'none',
          backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: mode === 'light'
              ? '0px 8px 32px rgba(0, 0, 0, 0.12)'
              : '0px 8px 32px rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(18, 18, 18, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)'}`,
          color: mode === 'light' ? '#1a1a1a' : '#ffffff',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(18, 18, 18, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)'}`,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

// Create light theme
export const lightTheme = createTheme(getDesignTokens('light'));

// Create dark theme
export const darkTheme = createTheme(getDesignTokens('dark'));

// Default export (light theme for backward compatibility)
export default lightTheme;