import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Mock i18n configuration for tests
i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          // Basic translations for tests
          common: {
            back: 'Back',
            next: 'Next',
            previous: 'Previous',
            continue: 'Continue',
            start: 'Start',
            practice: 'Practice',
            lesson: 'Lesson',
            loading: 'Loading...',
            exit: 'Exit',
            of: 'of',
            finish: 'Finish'
          },
          navigation: {
            home: 'Home',
            lessons: 'Lessons',
            practice: 'Practice',
            dictionary: 'Dictionary',
            about: 'About',
            settings: 'Settings'
          },
          nav: {
            changeLanguage: 'Change Language'
          },
          exercise: {
            progress: 'Progress',
            completed: 'Completed',
            correct: 'Correct',
            question: 'Question',
            noExercisesFound: 'No exercises found for this lesson.',
            correctlyAnswered: 'You answered this correctly!',
            alreadyAnswered: 'You have already answered this exercise.',
            lessonComplete: 'Lesson Complete!',
            excellentWork: 'Excellent work! You\'re really getting the hang of Toki Pona!',
            goodWork: 'Good work! Keep practicing to improve your score.',
            keepPracticing: 'Keep practicing! Review the lesson content and try again.',
            practiceAgain: 'Practice Again'
          }
        }
      }
    },
  });

export default i18n;