export interface LessonsTranslations {
  title: string;
  learningJourney: string;
  journeyDescription: string;
  achievements: string;

  // Lesson Achievements
  achievement: {
    firstSteps: string;
    gettingStarted: string;
    foundationMaster: string;
    vocabularyBuilder: string;
    grammarExpert: string;
    tokiPonaMaster: string;
  };
}

export const lessons: LessonsTranslations = {
  title: 'Lessons',
  learningJourney: '🎯 Your Learning Journey',
  journeyDescription: 'Complete all 16 lessons to master Toki Pona! Each lesson builds on the previous ones.',
  achievements: '🏆 Your Achievements',

  achievement: {
    firstSteps: 'First Steps (Complete 1 lesson)',
    gettingStarted: 'Getting Started (Complete 2 lessons)',
    foundationMaster: 'Foundation Master (Complete lessons 1-4)',
    vocabularyBuilder: 'Vocabulary Builder (Complete lessons 5-8)',
    grammarExpert: 'Grammar Expert (Complete lessons 9-13)',
    tokiPonaMaster: 'Toki Pona Master (Complete all lessons)',
  },
};