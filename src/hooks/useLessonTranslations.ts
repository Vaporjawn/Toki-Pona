// Lesson Translation Hook
// Provides translated lesson content based on current language

import { useTranslation } from 'react-i18next';
import {
  getTranslatedLesson,
  getTranslatedLessons,
  hasLessonTranslations,
  type TranslatedLesson
} from '../data/lesson-translations';

// Re-export the type for convenience
export type { TranslatedLesson } from '../data/lesson-translations';

export const useLessonTranslations = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const getLesson = (lessonId: number): TranslatedLesson | undefined => {
    return getTranslatedLesson(lessonId, currentLanguage);
  };

  const getAllLessons = (): TranslatedLesson[] => {
    return getTranslatedLessons(currentLanguage);
  };

  const isLanguageSupported = (): boolean => {
    return hasLessonTranslations(currentLanguage);
  };

  const getSupportedLanguages = (): string[] => {
    return ['en', 'es', 'fr', 'tok']; // Will expand as more translations are added
  };

  return {
    getLesson,
    getAllLessons,
    isLanguageSupported,
    getSupportedLanguages,
    currentLanguage
  };
};