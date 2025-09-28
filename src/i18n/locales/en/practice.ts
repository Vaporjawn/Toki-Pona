export interface PracticeTranslations {
  subtitle: string;
  quickReview: {
    title: string;
    description: string;
    action: string;
  };
  randomQuiz: {
    title: string;
    description: string;
    action: string;
  };
  speedPractice: {
    title: string;
    description: string;
    action: string;
  };
}

export const practice: PracticeTranslations = {
  subtitle: 'Practice and reinforce your Toki Pona skills',
  quickReview: {
    title: 'Quick Review',
    description: 'Review words you\'ve learned with flashcards',
    action: 'Start Review',
  },
  randomQuiz: {
    title: 'Random Quiz',
    description: 'Test your knowledge with random questions',
    action: 'Take Quiz',
  },
  speedPractice: {
    title: 'Speed Practice',
    description: 'Quick-fire translation exercises',
    action: 'Start Practice',
  },
};