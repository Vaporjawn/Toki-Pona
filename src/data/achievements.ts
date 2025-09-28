export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'practice' | 'vocabulary' | 'streak' | 'speed' | 'mastery' | 'exploration';
  icon: string;
  requirement: {
    type: 'practice_count' | 'words_mastered' | 'streak_days' | 'speed_wpm' | 'accuracy' | 'total_xp' | 'lesson_complete' | 'dictionary_views';
    value: number;
    timeframe?: 'session' | 'daily' | 'weekly' | 'all_time';
  };
  reward: {
    xp: number;
    badge?: string;
    title?: string;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isSecret?: boolean;
}

export interface UserStats {
  practiceCount?: number;
  wordsMastered?: number;
  currentStreak?: number;
  bestSpeed?: number;
  lastSessionAccuracy?: number;
  weeklyAccuracy?: number;
  overallAccuracy?: number;
  totalXP?: number;
  lessonsCompleted?: number;
  dictionaryViews?: number;
}

export const achievements: Achievement[] = [
  // Practice Category
  {
    id: 'first_practice',
    title: 'achievements.first_practice.title',
    description: 'achievements.first_practice.description',
    category: 'practice',
    icon: '🎯',
    requirement: {
      type: 'practice_count',
      value: 1,
      timeframe: 'all_time'
    },
    reward: {
      xp: 50,
      badge: 'Beginner',
      title: 'Practice Starter'
    },
    rarity: 'common'
  },
  {
    id: 'dedicated_learner',
    title: 'achievements.dedicated_learner.title',
    description: 'achievements.dedicated_learner.description',
    category: 'practice',
    icon: '📚',
    requirement: {
      type: 'practice_count',
      value: 10,
      timeframe: 'all_time'
    },
    reward: {
      xp: 200,
      badge: 'Dedicated',
      title: 'Dedicated Learner'
    },
    rarity: 'common'
  },
  {
    id: 'practice_warrior',
    title: 'achievements.practice_warrior.title',
    description: 'achievements.practice_warrior.description',
    category: 'practice',
    icon: '⚔️',
    requirement: {
      type: 'practice_count',
      value: 50,
      timeframe: 'all_time'
    },
    reward: {
      xp: 750,
      badge: 'Warrior',
      title: 'Practice Warrior'
    },
    rarity: 'rare'
  },
  {
    id: 'practice_legend',
    title: 'achievements.practice_legend.title',
    description: 'achievements.practice_legend.description',
    category: 'practice',
    icon: '👑',
    requirement: {
      type: 'practice_count',
      value: 100,
      timeframe: 'all_time'
    },
    reward: {
      xp: 1500,
      badge: 'Legend',
      title: 'Practice Legend'
    },
    rarity: 'legendary'
  },

  // Vocabulary Category
  {
    id: 'word_collector',
    title: 'achievements.word_collector.title',
    description: 'achievements.word_collector.description',
    category: 'vocabulary',
    icon: '📝',
    requirement: {
      type: 'words_mastered',
      value: 10,
      timeframe: 'all_time'
    },
    reward: {
      xp: 300,
      badge: 'Collector',
      title: 'Word Collector'
    },
    rarity: 'common'
  },
  {
    id: 'vocabulary_master',
    title: 'achievements.vocabulary_master.title',
    description: 'achievements.vocabulary_master.description',
    category: 'vocabulary',
    icon: '🧠',
    requirement: {
      type: 'words_mastered',
      value: 50,
      timeframe: 'all_time'
    },
    reward: {
      xp: 1000,
      badge: 'Master',
      title: 'Vocabulary Master'
    },
    rarity: 'rare'
  },
  {
    id: 'toki_pona_sage',
    title: 'achievements.toki_pona_sage.title',
    description: 'achievements.toki_pona_sage.description',
    category: 'vocabulary',
    icon: '🌟',
    requirement: {
      type: 'words_mastered',
      value: 120,
      timeframe: 'all_time'
    },
    reward: {
      xp: 2500,
      badge: 'Sage',
      title: 'Toki Pona Sage'
    },
    rarity: 'legendary'
  },

  // Streak Category
  {
    id: 'consistency_rookie',
    title: 'achievements.consistency_rookie.title',
    description: 'achievements.consistency_rookie.description',
    category: 'streak',
    icon: '🔥',
    requirement: {
      type: 'streak_days',
      value: 3,
      timeframe: 'all_time'
    },
    reward: {
      xp: 150,
      badge: 'Consistent',
      title: 'Consistency Rookie'
    },
    rarity: 'common'
  },
  {
    id: 'week_warrior',
    title: 'achievements.week_warrior.title',
    description: 'achievements.week_warrior.description',
    category: 'streak',
    icon: '🔥',
    requirement: {
      type: 'streak_days',
      value: 7,
      timeframe: 'all_time'
    },
    reward: {
      xp: 400,
      badge: 'Weekly Warrior',
      title: 'Week Warrior'
    },
    rarity: 'rare'
  },
  {
    id: 'month_master',
    title: 'achievements.month_master.title',
    description: 'achievements.month_master.description',
    category: 'streak',
    icon: '🌙',
    requirement: {
      type: 'streak_days',
      value: 30,
      timeframe: 'all_time'
    },
    reward: {
      xp: 1200,
      badge: 'Monthly Master',
      title: 'Month Master'
    },
    rarity: 'epic'
  },
  {
    id: 'eternal_flame',
    title: 'achievements.eternal_flame.title',
    description: 'achievements.eternal_flame.description',
    category: 'streak',
    icon: '🔥',
    requirement: {
      type: 'streak_days',
      value: 100,
      timeframe: 'all_time'
    },
    reward: {
      xp: 3000,
      badge: 'Eternal',
      title: 'Eternal Flame'
    },
    rarity: 'legendary',
    isSecret: true
  },

  // Speed Category
  {
    id: 'speed_demon',
    title: 'achievements.speed_demon.title',
    description: 'achievements.speed_demon.description',
    category: 'speed',
    icon: '⚡',
    requirement: {
      type: 'speed_wpm',
      value: 30,
      timeframe: 'session'
    },
    reward: {
      xp: 500,
      badge: 'Speed Demon',
      title: 'Speed Demon'
    },
    rarity: 'rare'
  },
  {
    id: 'lightning_fingers',
    title: 'achievements.lightning_fingers.title',
    description: 'achievements.lightning_fingers.description',
    category: 'speed',
    icon: '⚡',
    requirement: {
      type: 'speed_wpm',
      value: 50,
      timeframe: 'session'
    },
    reward: {
      xp: 1000,
      badge: 'Lightning',
      title: 'Lightning Fingers'
    },
    rarity: 'epic'
  },

  // Mastery Category
  {
    id: 'perfectionist',
    title: 'achievements.perfectionist.title',
    description: 'achievements.perfectionist.description',
    category: 'mastery',
    icon: '💯',
    requirement: {
      type: 'accuracy',
      value: 100,
      timeframe: 'session'
    },
    reward: {
      xp: 300,
      badge: 'Perfect',
      title: 'Perfectionist'
    },
    rarity: 'rare'
  },
  {
    id: 'accuracy_ace',
    title: 'achievements.accuracy_ace.title',
    description: 'achievements.accuracy_ace.description',
    category: 'mastery',
    icon: '🎯',
    requirement: {
      type: 'accuracy',
      value: 95,
      timeframe: 'weekly'
    },
    reward: {
      xp: 800,
      badge: 'Ace',
      title: 'Accuracy Ace'
    },
    rarity: 'epic'
  },

  // Exploration Category
  {
    id: 'curious_mind',
    title: 'achievements.curious_mind.title',
    description: 'achievements.curious_mind.description',
    category: 'exploration',
    icon: '🔍',
    requirement: {
      type: 'dictionary_views',
      value: 25,
      timeframe: 'all_time'
    },
    reward: {
      xp: 200,
      badge: 'Curious',
      title: 'Curious Mind'
    },
    rarity: 'common'
  },
  {
    id: 'knowledge_seeker',
    title: 'achievements.knowledge_seeker.title',
    description: 'achievements.knowledge_seeker.description',
    category: 'exploration',
    icon: '🧭',
    requirement: {
      type: 'dictionary_views',
      value: 100,
      timeframe: 'all_time'
    },
    reward: {
      xp: 600,
      badge: 'Seeker',
      title: 'Knowledge Seeker'
    },
    rarity: 'rare'
  },

  // XP Category
  {
    id: 'xp_novice',
    title: 'achievements.xp_novice.title',
    description: 'achievements.xp_novice.description',
    category: 'practice',
    icon: '⭐',
    requirement: {
      type: 'total_xp',
      value: 1000,
      timeframe: 'all_time'
    },
    reward: {
      xp: 100,
      badge: 'Novice',
      title: 'XP Novice'
    },
    rarity: 'common'
  },
  {
    id: 'xp_champion',
    title: 'achievements.xp_champion.title',
    description: 'achievements.xp_champion.description',
    category: 'practice',
    icon: '🏆',
    requirement: {
      type: 'total_xp',
      value: 5000,
      timeframe: 'all_time'
    },
    reward: {
      xp: 500,
      badge: 'Champion',
      title: 'XP Champion'
    },
    rarity: 'epic'
  },
  {
    id: 'xp_grandmaster',
    title: 'achievements.xp_grandmaster.title',
    description: 'achievements.xp_grandmaster.description',
    category: 'practice',
    icon: '👑',
    requirement: {
      type: 'total_xp',
      value: 10000,
      timeframe: 'all_time'
    },
    reward: {
      xp: 1000,
      badge: 'Grandmaster',
      title: 'XP Grandmaster'
    },
    rarity: 'legendary'
  }
];

export const getAchievementsByCategory = (category: Achievement['category']) =>
  achievements.filter(achievement => achievement.category === category);

export const getAchievementsByRarity = (rarity: Achievement['rarity']) =>
  achievements.filter(achievement => achievement.rarity === rarity);

export const getUnlockedAchievements = (userStats: UserStats) => {
  return achievements.filter(achievement => {
    if (achievement.isSecret && !isAchievementUnlocked(achievement, userStats)) {
      return false;
    }
    return true;
  });
};

export const isAchievementUnlocked = (achievement: Achievement, userStats: UserStats): boolean => {
  const { type, value, timeframe } = achievement.requirement;

  switch (type) {
    case 'practice_count':
      return (userStats.practiceCount || 0) >= value;
    case 'words_mastered':
      return (userStats.wordsMastered || 0) >= value;
    case 'streak_days':
      return (userStats.currentStreak || 0) >= value;
    case 'speed_wpm':
      return (userStats.bestSpeed || 0) >= value;
    case 'accuracy':
      if (timeframe === 'session') {
        return (userStats.lastSessionAccuracy || 0) >= value;
      } else if (timeframe === 'weekly') {
        return (userStats.weeklyAccuracy || 0) >= value;
      }
      return (userStats.overallAccuracy || 0) >= value;
    case 'total_xp':
      return (userStats.totalXP || 0) >= value;
    case 'lesson_complete':
      return (userStats.lessonsCompleted || 0) >= value;
    case 'dictionary_views':
      return (userStats.dictionaryViews || 0) >= value;
    default:
      return false;
  }
};

export const getAchievementProgress = (achievement: Achievement, userStats: UserStats): number => {
  const { type, value } = achievement.requirement;

  switch (type) {
    case 'practice_count':
      return Math.min(100, ((userStats.practiceCount || 0) / value) * 100);
    case 'words_mastered':
      return Math.min(100, ((userStats.wordsMastered || 0) / value) * 100);
    case 'streak_days':
      return Math.min(100, ((userStats.currentStreak || 0) / value) * 100);
    case 'speed_wpm':
      return Math.min(100, ((userStats.bestSpeed || 0) / value) * 100);
    case 'accuracy':
      return Math.min(100, ((userStats.overallAccuracy || 0) / value) * 100);
    case 'total_xp':
      return Math.min(100, ((userStats.totalXP || 0) / value) * 100);
    case 'lesson_complete':
      return Math.min(100, ((userStats.lessonsCompleted || 0) / value) * 100);
    case 'dictionary_views':
      return Math.min(100, ((userStats.dictionaryViews || 0) / value) * 100);
    default:
      return 0;
  }
};

export const getRarityColor = (rarity: Achievement['rarity']): string => {
  switch (rarity) {
    case 'common':
      return '#9E9E9E'; // Grey
    case 'rare':
      return '#2196F3'; // Blue
    case 'epic':
      return '#9C27B0'; // Purple
    case 'legendary':
      return '#FF9800'; // Orange/Gold
    default:
      return '#9E9E9E';
  }
};

export const getRarityGradient = (rarity: Achievement['rarity']): string => {
  switch (rarity) {
    case 'common':
      return 'linear-gradient(135deg, #9E9E9E 0%, #757575 100%)';
    case 'rare':
      return 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
    case 'epic':
      return 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)';
    case 'legendary':
      return 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)';
    default:
      return 'linear-gradient(135deg, #9E9E9E 0%, #757575 100%)';
  }
};