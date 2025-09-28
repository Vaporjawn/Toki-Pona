export interface HomeTranslations {
  title: string;
  subtitle: string;
  description: string;
  startLearning: string;
  learnEfficiently: string;
  whyTokiPona: string;
  readyToBegin: string;
  beginJourney: string;

  // Features Section
  features: {
    interactive: string;
    'interactive.desc': string;
    progress: string;
    'progress.desc': string;
    immersive: string;
    'immersive.desc': string;
  };

  // Example Section
  exampleTokiPona: string;
  exampleTranslation: string;
  exampleDescription: string;

  // Statistics
  stats: {
    totalWords: string;
    toFluency: string;
    createdBy: string;
  };
}

export const home: HomeTranslations = {
  title: 'Learn Toki Pona',
  subtitle: 'The Language of Good',
  description: 'Master the minimalist constructed language with only 120-137 words. Learn through interactive lessons, exercises, and immersive experiences.',
  startLearning: 'Start Learning',
  learnEfficiently: 'Learn Efficiently',
  whyTokiPona: 'Discover why toki pona is the perfect language to learn quickly',
  readyToBegin: 'Ready to Begin?',
  beginJourney: 'Begin your journey to linguistic simplicity',

  features: {
    interactive: 'Interactive Lessons',
    'interactive.desc': 'Engaging exercises and quizzes to reinforce learning',
    progress: 'Progress Tracking',
    'progress.desc': 'Track your learning journey with XP, streaks, and achievements',
    immersive: 'Immersive Experience',
    'immersive.desc': 'Learn through context with sitelen pona script and images',
  },

  exampleTokiPona: 'mi wile kama sona e toki pona',
  exampleTranslation: 'I want to learn toki pona',
  exampleDescription: 'With just 120-137 core words, toki pona encourages simple, clear thinking. Every concept can be expressed through creative combinations of basic words.',

  stats: {
    totalWords: 'Total Words',
    toFluency: 'To Fluency',
    createdBy: 'Created by Sonja Lang',
  },
};