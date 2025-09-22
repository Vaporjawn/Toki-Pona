import { useContext } from 'react';import { useContext } from 'react';import { useContext } from 'react';import { useContext } from 'react';import { useContext } from 'react';

import { ThemeContext, type ThemeContextType } from '../contexts/themeContext';

import { ThemeContext } from '../contexts/themeContext';

export const useTheme = (): ThemeContextType => {

  const context = useContext(ThemeContext);import { ThemeContext } from '../contexts/themeContext';

  if (context === undefined) {

    throw new Error('useTheme must be used within a ThemeProvider');export const useTheme = () => {

  }

  return context;  const context = useContext(ThemeContext);import { ThemeContext } from '../contexts/ThemeContext';import { ThemeContext } from '../contexts/ThemeContext';

};
  if (context === undefined) {

    throw new Error('useTheme must be used within a ThemeProvider');export const useTheme = () => {

  }

  return context;  const context = useContext(ThemeContext);

};
  if (context === undefined) {

    throw new Error('useTheme must be used within a ThemeProvider');export const useTheme = () => {export const useTheme = () => {

  }

  return context;  const context = useContext(ThemeContext);  const context = useContext(ThemeContext);

};
  if (context === undefined) {  if (context === undefined) {

    throw new Error('useTheme must be used within a ThemeProvider');    throw new Error('useTheme must be used within a ThemeProvider');

  }  }

  return context;  return context;

};};