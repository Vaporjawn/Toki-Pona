import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

// Progress-related interfaces
export interface ExerciseProgress {
  exerciseId: string;
  completed: boolean;
  score: number;
  attempts: number;
  lastAttemptAt: Date;
  timeSpent: number; // in seconds
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: Date;
  startedAt: Date;
  exercises: ExerciseProgress[];
  totalTimeSpent: number; // in seconds
  xpEarned: number;
  averageScore: number;
  attempts: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'lessons' | 'practice' | 'streaks' | 'vocabulary' | 'special';
}

export interface UserProgress {
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate?: Date;
  lessonsProgress: LessonProgress[];
  achievements: Achievement[];
  vocabularyMastered: string[]; // word IDs
  dailyGoal: number; // XP per day
  totalTimeSpent: number; // in seconds
  averageSessionTime: number; // in seconds
  preferredDifficulty: 'easy' | 'medium' | 'hard';
  studyDaysCount: number;
}

export interface PracticeSession {
  id: string;
  type: 'quickReview' | 'randomQuiz' | 'speedPractice' | 'vocabulary' | 'grammar';
  startedAt: Date;
  completedAt?: Date;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  xpEarned: number;
  vocabulary: string[]; // words practiced
}

export interface ProgressState {
  userProgress: UserProgress;
  currentSession?: PracticeSession;
  isLoading: boolean;
}

// Serialized versions for localStorage parsing
interface SerializedExerciseProgress {
  exerciseId: string;
  completed: boolean;
  score: number;
  attempts: number;
  lastAttemptAt: string;
  timeSpent: number;
}

interface SerializedLessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  startedAt: string;
  exercises: SerializedExerciseProgress[];
  totalTimeSpent: number;
  xpEarned: number;
  averageScore: number;
  attempts: number;
}

interface SerializedAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'lessons' | 'practice' | 'streaks' | 'vocabulary' | 'special';
}

interface SerializedUserProgress {
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate?: string;
  lessonsProgress: SerializedLessonProgress[];
  achievements: SerializedAchievement[];
  vocabularyMastered: string[];
  dailyGoal: number;
  totalTimeSpent: number;
  averageSessionTime: number;
  preferredDifficulty: 'easy' | 'medium' | 'hard';
  studyDaysCount: number;
}

// Action types
type ProgressAction =
  | { type: 'LOAD_PROGRESS'; payload: UserProgress }
  | { type: 'START_LESSON'; payload: { lessonId: string } }
  | { type: 'COMPLETE_EXERCISE'; payload: { lessonId: string; exerciseId: string; score: number; timeSpent: number } }
  | { type: 'COMPLETE_LESSON'; payload: { lessonId: string; totalScore: number; timeSpent: number; xpEarned: number } }
  | { type: 'START_PRACTICE_SESSION'; payload: Omit<PracticeSession, 'id' | 'completedAt' | 'score' | 'correctAnswers' | 'xpEarned'> }
  | { type: 'UPDATE_PRACTICE_SESSION'; payload: { score: number; correctAnswers: number; timeSpent: number; vocabulary: string[] } }
  | { type: 'COMPLETE_PRACTICE_SESSION'; payload: { xpEarned: number } }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: Achievement }
  | { type: 'UPDATE_STREAK'; payload: { currentStreak: number; longestStreak: number } }
  | { type: 'ADD_VOCABULARY_MASTERED'; payload: string[] }
  | { type: 'UPDATE_DAILY_GOAL'; payload: number }
  | { type: 'UPDATE_DIFFICULTY'; payload: 'easy' | 'medium' | 'hard' }
  | { type: 'IMPORT_PROGRESS'; payload: UserProgress }
  | { type: 'RESET_ALL_PROGRESS' }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial state
const initialState: ProgressState = {
  userProgress: {
    totalXP: 0,
    currentStreak: 0,
    longestStreak: 0,
    lessonsProgress: [],
    achievements: [],
    vocabularyMastered: [],
    dailyGoal: 50, // Default daily XP goal
    totalTimeSpent: 0,
    averageSessionTime: 0,
    preferredDifficulty: 'medium',
    studyDaysCount: 0,
  },
  isLoading: false,
};

// Achievements data
const ACHIEVEMENTS: Omit<Achievement, 'unlockedAt'>[] = [
  // Lesson achievements
  { id: 'first_lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', category: 'lessons' },
  { id: 'five_lessons', name: 'Getting Started', description: 'Complete 5 lessons', icon: '📚', category: 'lessons' },
  { id: 'ten_lessons', name: 'Dedicated Learner', description: 'Complete 10 lessons', icon: '🌟', category: 'lessons' },
  { id: 'all_lessons', name: 'Master Student', description: 'Complete all lessons', icon: '🎓', category: 'lessons' },

  // XP achievements
  { id: 'hundred_xp', name: 'Centurion', description: 'Earn 100 XP', icon: '💯', category: 'special' },
  { id: 'thousand_xp', name: 'XP Master', description: 'Earn 1,000 XP', icon: '⭐', category: 'special' },

  // Streak achievements
  { id: 'three_day_streak', name: 'Consistent', description: 'Study for 3 days in a row', icon: '🔥', category: 'streaks' },
  { id: 'week_streak', name: 'Committed', description: 'Study for 7 days in a row', icon: '🚀', category: 'streaks' },
  { id: 'month_streak', name: 'Unstoppable', description: 'Study for 30 days in a row', icon: '💪', category: 'streaks' },

  // Vocabulary achievements
  { id: 'fifty_words', name: 'Word Collector', description: 'Master 50 vocabulary words', icon: '📖', category: 'vocabulary' },
  { id: 'hundred_words', name: 'Vocabulary Expert', description: 'Master 100 vocabulary words', icon: '🧠', category: 'vocabulary' },

  // Practice achievements
  { id: 'first_practice', name: 'Practice Makes Perfect', description: 'Complete your first practice session', icon: '🎪', category: 'practice' },
  { id: 'perfect_score', name: 'Perfectionist', description: 'Get a perfect score in practice', icon: '✨', category: 'practice' },
];

// Progress reducer
function progressReducer(state: ProgressState, action: ProgressAction): ProgressState {
  switch (action.type) {
    case 'LOAD_PROGRESS':
      return {
        ...state,
        userProgress: action.payload,
        isLoading: false,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'START_LESSON': {
      const { lessonId } = action.payload;
      const existingProgress = state.userProgress.lessonsProgress.find(p => p.lessonId === lessonId);

      if (existingProgress) {
        return state; // Already started
      }

      const newLessonProgress: LessonProgress = {
        lessonId,
        completed: false,
        startedAt: new Date(),
        exercises: [],
        totalTimeSpent: 0,
        xpEarned: 0,
        averageScore: 0,
        attempts: 1,
      };

      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          lessonsProgress: [...state.userProgress.lessonsProgress, newLessonProgress],
        },
      };
    }

    case 'COMPLETE_EXERCISE': {
      const { lessonId, exerciseId, score, timeSpent } = action.payload;
      const lessonsProgress = state.userProgress.lessonsProgress.map(lessonProgress => {
        if (lessonProgress.lessonId !== lessonId) return lessonProgress;

        const existingExercise = lessonProgress.exercises.find(e => e.exerciseId === exerciseId);
        const updatedExercises = existingExercise
          ? lessonProgress.exercises.map(exercise =>
              exercise.exerciseId === exerciseId
                ? {
                    ...exercise,
                    completed: true,
                    score: Math.max(exercise.score, score),
                    attempts: exercise.attempts + 1,
                    lastAttemptAt: new Date(),
                    timeSpent: exercise.timeSpent + timeSpent,
                  }
                : exercise
            )
          : [
              ...lessonProgress.exercises,
              {
                exerciseId,
                completed: true,
                score,
                attempts: 1,
                lastAttemptAt: new Date(),
                timeSpent,
              },
            ];

        const averageScore = updatedExercises.length > 0
          ? updatedExercises.reduce((sum, ex) => sum + ex.score, 0) / updatedExercises.length
          : 0;

        return {
          ...lessonProgress,
          exercises: updatedExercises,
          totalTimeSpent: lessonProgress.totalTimeSpent + timeSpent,
          averageScore,
        };
      });

      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          lessonsProgress,
          totalTimeSpent: state.userProgress.totalTimeSpent + timeSpent,
        },
      };
    }

    case 'COMPLETE_LESSON': {
      const { lessonId, totalScore, timeSpent, xpEarned } = action.payload;
      const updatedProgress = {
        ...state.userProgress,
        totalXP: state.userProgress.totalXP + xpEarned,
        lessonsProgress: state.userProgress.lessonsProgress.map(lessonProgress =>
          lessonProgress.lessonId === lessonId
            ? {
                ...lessonProgress,
                completed: true,
                completedAt: new Date(),
                xpEarned: lessonProgress.xpEarned + xpEarned,
                totalTimeSpent: lessonProgress.totalTimeSpent + timeSpent,
                averageScore: totalScore,
              }
            : lessonProgress
        ),
      };

      return {
        ...state,
        userProgress: updatedProgress,
      };
    }

    case 'START_PRACTICE_SESSION': {
      const sessionId = Date.now().toString();
      const newSession: PracticeSession = {
        ...action.payload,
        id: sessionId,
        score: 0,
        correctAnswers: 0,
        xpEarned: 0,
      };

      return {
        ...state,
        currentSession: newSession,
      };
    }

    case 'UPDATE_PRACTICE_SESSION': {
      if (!state.currentSession) return state;

      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          score: action.payload.score,
          correctAnswers: action.payload.correctAnswers,
          timeSpent: action.payload.timeSpent,
          vocabulary: action.payload.vocabulary,
        },
      };
    }

    case 'COMPLETE_PRACTICE_SESSION': {
      if (!state.currentSession) return state;

      const completedSession = {
        ...state.currentSession,
        completedAt: new Date(),
        xpEarned: action.payload.xpEarned,
      };

      return {
        ...state,
        currentSession: undefined,
        userProgress: {
          ...state.userProgress,
          totalXP: state.userProgress.totalXP + action.payload.xpEarned,
          totalTimeSpent: state.userProgress.totalTimeSpent + completedSession.timeSpent,
        },
      };
    }

    case 'UNLOCK_ACHIEVEMENT': {
      const existingAchievement = state.userProgress.achievements.find(a => a.id === action.payload.id);
      if (existingAchievement) return state;

      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          achievements: [...state.userProgress.achievements, action.payload],
        },
      };
    }

    case 'UPDATE_STREAK': {
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          currentStreak: action.payload.currentStreak,
          longestStreak: action.payload.longestStreak,
          lastStudyDate: new Date(),
        },
      };
    }

    case 'ADD_VOCABULARY_MASTERED': {
      const newWords = action.payload.filter(word => !state.userProgress.vocabularyMastered.includes(word));

      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          vocabularyMastered: [...state.userProgress.vocabularyMastered, ...newWords],
        },
      };
    }

    case 'UPDATE_DAILY_GOAL': {
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          dailyGoal: action.payload,
        },
      };
    }

    case 'UPDATE_DIFFICULTY': {
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          preferredDifficulty: action.payload,
        },
      };
    }

    case 'IMPORT_PROGRESS': {
      return {
        ...state,
        userProgress: action.payload,
        isLoading: false,
      };
    }

    case 'RESET_ALL_PROGRESS': {
      return {
        ...state,
        userProgress: initialState.userProgress,
        currentSession: undefined,
        isLoading: false,
      };
    }

    default:
      return state;
  }
}

// Context
const ProgressContext = createContext<{
  state: ProgressState;
  dispatch: React.Dispatch<ProgressAction>;
  // Helper functions
  isLessonCompleted: (lessonId: string) => boolean;
  isLessonStarted: (lessonId: string) => boolean;
  getLessonProgress: (lessonId: string) => LessonProgress | undefined;
  getCompletedLessonsCount: () => number;
  getTotalXP: () => number;
  getCurrentStreak: () => number;
  checkAndUnlockAchievements: () => void;
  updateStreak: () => void;
  saveProgress: () => void;
  loadProgress: () => void;
} | undefined>(undefined);

// Provider component
export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(progressReducer, initialState);

  // Helper functions
  const isLessonCompleted = useCallback((lessonId: string): boolean => {
    const lessonProgress = state.userProgress.lessonsProgress.find(p => p.lessonId === lessonId);
    return lessonProgress?.completed ?? false;
  }, [state.userProgress.lessonsProgress]);

  const isLessonStarted = useCallback((lessonId: string): boolean => {
    return state.userProgress.lessonsProgress.some(p => p.lessonId === lessonId);
  }, [state.userProgress.lessonsProgress]);

  const getLessonProgress = useCallback((lessonId: string): LessonProgress | undefined => {
    return state.userProgress.lessonsProgress.find(p => p.lessonId === lessonId);
  }, [state.userProgress.lessonsProgress]);

  const getCompletedLessonsCount = useCallback((): number => {
    return state.userProgress.lessonsProgress.filter(p => p.completed).length;
  }, [state.userProgress.lessonsProgress]);

  const getTotalXP = useCallback((): number => {
    return state.userProgress.totalXP;
  }, [state.userProgress.totalXP]);

  const getCurrentStreak = useCallback((): number => {
    return state.userProgress.currentStreak;
  }, [state.userProgress.currentStreak]);

  const unlockAchievement = useCallback((achievementId: string): void => {
    const achievementTemplate = ACHIEVEMENTS.find(a => a.id === achievementId);
    if (achievementTemplate && !state.userProgress.achievements.some(a => a.id === achievementId)) {
      const achievement: Achievement = {
        ...achievementTemplate,
        unlockedAt: new Date(),
      };
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: achievement });
    }
  }, [state.userProgress.achievements]);

  const updateStreak = useCallback((): void => {
    const today = new Date();
    const lastStudyDate = state.userProgress.lastStudyDate;

    let newStreak = 1;

    if (lastStudyDate) {
      const daysDifference = Math.floor((today.getTime() - lastStudyDate.getTime()) / (1000 * 3600 * 24));

      if (daysDifference === 1) {
        // Consecutive day
        newStreak = state.userProgress.currentStreak + 1;
      } else if (daysDifference > 1) {
        // Streak broken
        newStreak = 1;
      } else {
        // Same day, keep current streak
        newStreak = state.userProgress.currentStreak;
      }
    }

    const longestStreak = Math.max(state.userProgress.longestStreak, newStreak);

    dispatch({
      type: 'UPDATE_STREAK',
      payload: { currentStreak: newStreak, longestStreak },
    });
  }, [state.userProgress.lastStudyDate, state.userProgress.currentStreak, state.userProgress.longestStreak]);

  const saveProgress = useCallback((): void => {
    try {
      localStorage.setItem('tokiPonaProgress', JSON.stringify(state.userProgress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, [state.userProgress]);

  const checkAndUnlockAchievements = useCallback((): void => {
    const completedLessons = getCompletedLessonsCount();
    const totalXP = getTotalXP();
    const currentStreak = getCurrentStreak();
    const vocabularyCount = state.userProgress.vocabularyMastered.length;

    // Check lesson achievements
    if (completedLessons >= 1) {
      unlockAchievement('first_lesson');
    }
    if (completedLessons >= 5) {
      unlockAchievement('five_lessons');
    }
    if (completedLessons >= 10) {
      unlockAchievement('ten_lessons');
    }
    if (completedLessons >= 16) {
      unlockAchievement('all_lessons');
    }

    // Check XP achievements
    if (totalXP >= 100) {
      unlockAchievement('hundred_xp');
    }
    if (totalXP >= 1000) {
      unlockAchievement('thousand_xp');
    }

    // Check streak achievements
    if (currentStreak >= 3) {
      unlockAchievement('three_day_streak');
    }
    if (currentStreak >= 7) {
      unlockAchievement('week_streak');
    }
    if (currentStreak >= 30) {
      unlockAchievement('month_streak');
    }

    // Check vocabulary achievements
    if (vocabularyCount >= 50) {
      unlockAchievement('fifty_words');
    }
    if (vocabularyCount >= 100) {
      unlockAchievement('hundred_words');
    }
  }, [getCompletedLessonsCount, getTotalXP, getCurrentStreak, state.userProgress.vocabularyMastered, unlockAchievement]);

  const loadProgress = useCallback((): void => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const savedProgress = localStorage.getItem('tokiPonaProgress');
      if (savedProgress) {
        const parsedProgress: SerializedUserProgress = JSON.parse(savedProgress);
        // Convert date strings back to Date objects
        const userProgress: UserProgress = {
          ...parsedProgress,
          lastStudyDate: parsedProgress.lastStudyDate ? new Date(parsedProgress.lastStudyDate) : undefined,
          lessonsProgress: parsedProgress.lessonsProgress.map((lp: SerializedLessonProgress) => ({
            ...lp,
            startedAt: new Date(lp.startedAt),
            completedAt: lp.completedAt ? new Date(lp.completedAt) : undefined,
            exercises: lp.exercises.map((ex: SerializedExerciseProgress) => ({
              ...ex,
              lastAttemptAt: new Date(ex.lastAttemptAt),
            })),
          })),
          achievements: parsedProgress.achievements.map((ach: SerializedAchievement) => ({
            ...ach,
            unlockedAt: new Date(ach.unlockedAt),
          })),
        };
        dispatch({ type: 'LOAD_PROGRESS', payload: userProgress });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Auto-save progress when it changes
  useEffect(() => {
    if (!state.isLoading) {
      saveProgress();
    }
  }, [state.userProgress, saveProgress, state.isLoading]);

  // Load progress on mount
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Check for achievements when progress changes
  useEffect(() => {
    if (!state.isLoading) {
      checkAndUnlockAchievements();
    }
  }, [state.userProgress.lessonsProgress, state.userProgress.totalXP, state.userProgress.currentStreak, state.userProgress.vocabularyMastered, checkAndUnlockAchievements, state.isLoading]);

  const contextValue = {
    state,
    dispatch,
    isLessonCompleted,
    isLessonStarted,
    getLessonProgress,
    getCompletedLessonsCount,
    getTotalXP,
    getCurrentStreak,
    checkAndUnlockAchievements,
    updateStreak,
    saveProgress,
    loadProgress,
  };

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;