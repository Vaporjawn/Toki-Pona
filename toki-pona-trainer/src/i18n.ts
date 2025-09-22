import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.lessons': 'Lessons',
      'nav.dictionary': 'Dictionary',
      'nav.practice': 'Practice',
      'nav.about': 'About',

      // Home page
      'home.title': 'Learn Toki Pona',
      'home.subtitle': 'The Language of Good',
      'home.description': 'Master the minimalist constructed language with only 120-137 words. Learn through interactive lessons, exercises, and immersive experiences.',
      'home.startLearning': 'Start Learning',
      'home.continue': 'Continue Learning',
      'home.features.interactive': 'Interactive Lessons',
      'home.features.interactive.desc': 'Engaging exercises and quizzes to reinforce learning',
      'home.features.progress': 'Progress Tracking',
      'home.features.progress.desc': 'Track your learning journey with XP, streaks, and achievements',
      'home.features.immersive': 'Immersive Experience',
      'home.features.immersive.desc': 'Learn through context with sitelen pona script and images',

      // Lessons
      'lessons.title': 'Lessons',
      'lessons.progress': 'Progress: {{current}}/{{total}}',
      'lessons.xp': '{{xp}} XP',
      'lessons.start': 'Start Lesson',
      'lessons.continue': 'Continue',
      'lessons.completed': 'Completed',

      // Exercise types
      'exercise.multipleChoice': 'Choose the correct translation',
      'exercise.fillBlank': 'Fill in the blank',
      'exercise.matching': 'Match the words',
      'exercise.typing': 'Type the translation',
      'exercise.check': 'Check Answer',
      'exercise.next': 'Next',
      'exercise.correct': 'Correct!',
      'exercise.incorrect': 'Try again',
      'exercise.showAnswer': 'Show Answer',

      // Dictionary
      'dictionary.title': 'Toki Pona Dictionary',
      'dictionary.search': 'Search words...',
      'dictionary.partOfSpeech': 'Part of Speech',
      'dictionary.examples': 'Examples',
      'dictionary.sitelen': 'Sitelen Pona',

      // Progress
      'progress.level': 'Level {{level}}',
      'progress.xp': '{{current}}/{{next}} XP',
      'progress.streak': '{{days}} day streak',
      'progress.achievements': 'Achievements',

      // Common
      'common.loading': 'Loading...',
      'common.error': 'An error occurred',
      'common.tryAgain': 'Try Again',
      'common.back': 'Back',
      'common.next': 'Next',
      'common.previous': 'Previous',
      'common.close': 'Close',
    },
  },
  es: {
    translation: {
      // Navigation
      'nav.home': 'Inicio',
      'nav.lessons': 'Lecciones',
      'nav.dictionary': 'Diccionario',
      'nav.practice': 'Práctica',
      'nav.about': 'Acerca de',

      // Home page
      'home.title': 'Aprende Toki Pona',
      'home.subtitle': 'El Idioma del Bien',
      'home.description': 'Domina el lenguaje construido minimalista con solo 120-137 palabras. Aprende a través de lecciones interactivas, ejercicios y experiencias inmersivas.',
      'home.startLearning': 'Comenzar a Aprender',
      'home.continue': 'Continuar Aprendiendo',
      'home.features.interactive': 'Lecciones Interactivas',
      'home.features.interactive.desc': 'Ejercicios y cuestionarios atractivos para reforzar el aprendizaje',
      'home.features.progress': 'Seguimiento del Progreso',
      'home.features.progress.desc': 'Rastrea tu viaje de aprendizaje con XP, rachas y logros',
      'home.features.immersive': 'Experiencia Inmersiva',
      'home.features.immersive.desc': 'Aprende a través del contexto con escritura sitelen pona e imágenes',

      // Lessons
      'lessons.title': 'Lecciones',
      'lessons.progress': 'Progreso: {{current}}/{{total}}',
      'lessons.xp': '{{xp}} XP',
      'lessons.start': 'Comenzar Lección',
      'lessons.continue': 'Continuar',
      'lessons.completed': 'Completado',

      // Exercise types
      'exercise.multipleChoice': 'Elige la traducción correcta',
      'exercise.fillBlank': 'Llena el espacio',
      'exercise.matching': 'Empareja las palabras',
      'exercise.typing': 'Escribe la traducción',
      'exercise.check': 'Verificar Respuesta',
      'exercise.next': 'Siguiente',
      'exercise.correct': '¡Correcto!',
      'exercise.incorrect': 'Inténtalo de nuevo',
      'exercise.showAnswer': 'Mostrar Respuesta',

      // Dictionary
      'dictionary.title': 'Diccionario de Toki Pona',
      'dictionary.search': 'Buscar palabras...',
      'dictionary.partOfSpeech': 'Tipo de Palabra',
      'dictionary.examples': 'Ejemplos',
      'dictionary.sitelen': 'Sitelen Pona',

      // Progress
      'progress.level': 'Nivel {{level}}',
      'progress.xp': '{{current}}/{{next}} XP',
      'progress.streak': 'Racha de {{days}} días',
      'progress.achievements': 'Logros',

      // Common
      'common.loading': 'Cargando...',
      'common.error': 'Ocurrió un error',
      'common.tryAgain': 'Intentar de Nuevo',
      'common.back': 'Atrás',
      'common.next': 'Siguiente',
      'common.previous': 'Anterior',
      'common.close': 'Cerrar',
    },
  },
  fr: {
    translation: {
      // Navigation
      'nav.home': 'Accueil',
      'nav.lessons': 'Leçons',
      'nav.dictionary': 'Dictionnaire',
      'nav.practice': 'Pratique',
      'nav.about': 'À propos',

      // Home page
      'home.title': 'Apprendre le Toki Pona',
      'home.subtitle': 'La Langue du Bien',
      'home.description': 'Maîtrisez la langue construite minimaliste avec seulement 120-137 mots. Apprenez à travers des leçons interactives, des exercices et des expériences immersives.',
      'home.startLearning': 'Commencer à Apprendre',
      'home.continue': 'Continuer l\'Apprentissage',
      'home.features.interactive': 'Leçons Interactives',
      'home.features.interactive.desc': 'Exercices et quiz engageants pour renforcer l\'apprentissage',
      'home.features.progress': 'Suivi des Progrès',
      'home.features.progress.desc': 'Suivez votre parcours d\'apprentissage avec XP, séries et réalisations',
      'home.features.immersive': 'Expérience Immersive',
      'home.features.immersive.desc': 'Apprenez par le contexte avec l\'écriture sitelen pona et les images',

      // Lessons
      'lessons.title': 'Leçons',
      'lessons.progress': 'Progrès: {{current}}/{{total}}',
      'lessons.xp': '{{xp}} XP',
      'lessons.start': 'Commencer la Leçon',
      'lessons.continue': 'Continuer',
      'lessons.completed': 'Terminé',

      // Exercise types
      'exercise.multipleChoice': 'Choisissez la bonne traduction',
      'exercise.fillBlank': 'Remplissez le blanc',
      'exercise.matching': 'Associez les mots',
      'exercise.typing': 'Tapez la traduction',
      'exercise.check': 'Vérifier la Réponse',
      'exercise.next': 'Suivant',
      'exercise.correct': 'Correct!',
      'exercise.incorrect': 'Essayez encore',
      'exercise.showAnswer': 'Montrer la Réponse',

      // Dictionary
      'dictionary.title': 'Dictionnaire Toki Pona',
      'dictionary.search': 'Rechercher des mots...',
      'dictionary.partOfSpeech': 'Nature du Mot',
      'dictionary.examples': 'Exemples',
      'dictionary.sitelen': 'Sitelen Pona',

      // Progress
      'progress.level': 'Niveau {{level}}',
      'progress.xp': '{{current}}/{{next}} XP',
      'progress.streak': 'Série de {{days}} jours',
      'progress.achievements': 'Réalisations',

      // Common
      'common.loading': 'Chargement...',
      'common.error': 'Une erreur s\'est produite',
      'common.tryAgain': 'Réessayer',
      'common.back': 'Retour',
      'common.next': 'Suivant',
      'common.previous': 'Précédent',
      'common.close': 'Fermer',
    },
  },
  tok: {
    translation: {
      // Navigation (Toki Pona UI mode)
      'nav.home': 'lipu open',
      'nav.lessons': 'lipu sona',
      'nav.dictionary': 'lipu nimi',
      'nav.practice': 'pali sona',
      'nav.about': 'sona lipu',

      // Home page
      'home.title': 'o kama sona e toki pona',
      'home.subtitle': 'toki pona',
      'home.description': 'o kama sona e toki lili. nimi li mute ala - wan ni wan ni. sina ken pali e ni kepeken lipu sona en pali musi.',
      'home.startLearning': 'o open kama sona',
      'home.continue': 'o awen kama sona',
      'home.features.interactive': 'lipu sona pali',
      'home.features.interactive.desc': 'pali musi li pana e sona sin',
      'home.features.progress': 'lukin nasin',
      'home.features.progress.desc': 'sina lukin e nasin sina kepeken sona mute',
      'home.features.immersive': 'pali lon',
      'home.features.immersive.desc': 'o kama sona kepeken sitelen pona en sitelen',

      // Lessons
      'lessons.title': 'lipu sona',
      'lessons.progress': 'nasin: {{current}}/{{total}}',
      'lessons.xp': 'sona {{xp}}',
      'lessons.start': 'o open',
      'lessons.continue': 'o awen',
      'lessons.completed': 'pini',

      // Exercise types
      'exercise.multipleChoice': 'o wile e ante pona',
      'exercise.fillBlank': 'o pana e nimi',
      'exercise.matching': 'o sama e nimi',
      'exercise.typing': 'o sitelen e ante',
      'exercise.check': 'o lukin',
      'exercise.next': 'sin',
      'exercise.correct': 'pona!',
      'exercise.incorrect': 'o sin',
      'exercise.showAnswer': 'o lukin e pona',

      // Dictionary
      'dictionary.title': 'lipu nimi ale',
      'dictionary.search': 'o alasa e nimi...',
      'dictionary.partOfSpeech': 'nasin nimi',
      'dictionary.examples': 'sitelen sama',
      'dictionary.sitelen': 'sitelen pona',

      // Progress
      'progress.level': 'suli {{level}}',
      'progress.xp': 'sona {{current}}/{{next}}',
      'progress.streak': 'tenpo {{days}}',
      'progress.achievements': 'pali pona',

      // Common
      'common.loading': 'kama...',
      'common.error': 'ike li lon',
      'common.tryAgain': 'o sin',
      'common.back': 'monsi',
      'common.next': 'sin',
      'common.previous': 'pini',
      'common.close': 'pini',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;