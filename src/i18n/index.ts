import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import modular translations
import enTranslations from './locales/en';
import esTranslations from './locales/es';
import frTranslations from './locales/fr';
import tokTranslations from './locales/tok';
import zhCNTranslations from './locales/zh-CN';
import { jaTranslations } from './locales/ja';
import { koTranslations } from './locales/ko';
import { eoTranslations } from './locales/eo';
import { ruTranslations } from './locales/ru';

// Import remaining languages from the old structure temporarily
import { resources as oldResources } from '../i18n-old';
import { arTranslations } from './locales/ar';
import { it as itTranslations } from './locales/it';
import { vi as viTranslations } from './locales/vi';
import { tr as trTranslations } from './locales/tr';
import { de as deTranslations } from './locales/de';
import { ha as haTranslations } from './locales/ha';
import { tl as tlTranslations } from './locales/tl';
import { pl as plTranslations } from './locales/pl';
import { pt as ptTranslations } from './locales/pt';

// Track RTL locales for direction handling
const RTL_LANGS = new Set<string>(['ar']);

// Helper function to flatten nested translation objects back to dot notation
// This maintains compatibility with existing i18n keys throughout the app
function flattenTranslations(prefix: string, obj: unknown): Record<string, string> {
  const flattened: Record<string, string> = {};

  function flatten(source: Record<string, unknown>, currentPrefix: string) {
    for (const [key, value] of Object.entries(source)) {
      const newKey = currentPrefix ? `${currentPrefix}.${key}` : key;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        flatten(value as Record<string, unknown>, newKey);
      } else {
        flattened[newKey] = value as string;
      }
    }
  }

  flatten(obj as Record<string, unknown>, prefix);
  return flattened;
}

// Create resources object combining new modular structure with old flat structure
const resources = {
  en: {
    translation: {
      ...flattenTranslations('nav', enTranslations.nav),
      ...flattenTranslations('home', enTranslations.home),
      ...flattenTranslations('lessons', enTranslations.lessons),
      ...flattenTranslations('dictionary', enTranslations.dictionary),
      ...flattenTranslations('about', enTranslations.about),
      ...flattenTranslations('practice', enTranslations.practice),
      ...flattenTranslations('translator', enTranslations.translator),
      ...flattenTranslations('theme', enTranslations.theme),
      ...flattenTranslations('common', enTranslations.common),
    },
  },
  es: {
    translation: {
      ...flattenTranslations('nav', esTranslations.nav),
      ...flattenTranslations('home', esTranslations.home),
      ...flattenTranslations('lessons', esTranslations.lessons),
      ...flattenTranslations('dictionary', esTranslations.dictionary),
      ...flattenTranslations('about', esTranslations.about),
      ...flattenTranslations('practice', esTranslations.practice),
      ...flattenTranslations('translator', esTranslations.translator),
      ...flattenTranslations('theme', esTranslations.theme),
      ...flattenTranslations('common', esTranslations.common),
    },
  },
  fr: {
    translation: {
      ...flattenTranslations('nav', frTranslations.nav),
      ...flattenTranslations('home', frTranslations.home),
      ...flattenTranslations('lessons', frTranslations.lessons),
      ...flattenTranslations('dictionary', frTranslations.dictionary),
      ...flattenTranslations('about', frTranslations.about),
      ...flattenTranslations('practice', frTranslations.practice),
      ...flattenTranslations('translator', frTranslations.translator),
      ...flattenTranslations('theme', frTranslations.theme),
      ...flattenTranslations('common', frTranslations.common),
    },
  },
  tok: {
    translation: {
      ...flattenTranslations('nav', tokTranslations.nav),
      ...flattenTranslations('home', tokTranslations.home),
      ...flattenTranslations('lessons', tokTranslations.lessons),
      ...flattenTranslations('dictionary', tokTranslations.dictionary),
      ...flattenTranslations('about', tokTranslations.about),
      ...flattenTranslations('practice', tokTranslations.practice),
      ...flattenTranslations('translator', tokTranslations.translator),
      ...flattenTranslations('theme', tokTranslations.theme),
      ...flattenTranslations('common', tokTranslations.common),
    },
  },
  'zh-CN': {
    translation: {
      ...flattenTranslations('nav', zhCNTranslations.nav),
      ...flattenTranslations('home', zhCNTranslations.home),
      ...flattenTranslations('lessons', zhCNTranslations.lessons),
      ...flattenTranslations('dictionary', zhCNTranslations.dictionary),
      ...flattenTranslations('about', zhCNTranslations.about),
      ...flattenTranslations('practice', zhCNTranslations.practice),
      ...flattenTranslations('translator', zhCNTranslations.translator),
      ...flattenTranslations('theme', zhCNTranslations.theme),
      ...flattenTranslations('common', zhCNTranslations.common),
    },
  },
  ja: {
    translation: {
      ...flattenTranslations('nav', jaTranslations.nav),
      ...flattenTranslations('home', jaTranslations.home),
      ...flattenTranslations('lessons', jaTranslations.lessons),
      ...flattenTranslations('dictionary', jaTranslations.dictionary),
      ...flattenTranslations('about', jaTranslations.about),
      ...flattenTranslations('practice', jaTranslations.practice),
      ...flattenTranslations('translator', jaTranslations.translator),
      ...flattenTranslations('theme', jaTranslations.theme),
      ...flattenTranslations('common', jaTranslations.common),
    },
  },
  ko: {
    translation: {
      ...flattenTranslations('nav', koTranslations.nav),
      ...flattenTranslations('home', koTranslations.home),
      ...flattenTranslations('lessons', koTranslations.lessons),
      ...flattenTranslations('dictionary', koTranslations.dictionary),
      ...flattenTranslations('about', koTranslations.about),
      ...flattenTranslations('practice', koTranslations.practice),
      ...flattenTranslations('translator', koTranslations.translator),
      ...flattenTranslations('theme', koTranslations.theme),
      ...flattenTranslations('common', koTranslations.common),
    },
  },
  eo: {
    translation: {
      ...flattenTranslations('nav', eoTranslations.nav),
      ...flattenTranslations('home', eoTranslations.home),
      ...flattenTranslations('lessons', eoTranslations.lessons),
      ...flattenTranslations('dictionary', eoTranslations.dictionary),
      ...flattenTranslations('about', eoTranslations.about),
      ...flattenTranslations('practice', eoTranslations.practice),
      ...flattenTranslations('translator', eoTranslations.translator),
      ...flattenTranslations('theme', eoTranslations.theme),
      ...flattenTranslations('common', eoTranslations.common),
    },
  },
  ru: {
    translation: {
      ...flattenTranslations('nav', ruTranslations.nav),
      ...flattenTranslations('home', ruTranslations.home),
      ...flattenTranslations('lessons', ruTranslations.lessons),
      ...flattenTranslations('dictionary', ruTranslations.dictionary),
      ...flattenTranslations('about', ruTranslations.about),
      ...flattenTranslations('practice', ruTranslations.practice),
      ...flattenTranslations('translator', ruTranslations.translator),
      ...flattenTranslations('theme', ruTranslations.theme),
      ...flattenTranslations('common', ruTranslations.common),
    },
  },
  ar: {
    translation: {
      ...flattenTranslations('nav', arTranslations.nav),
      ...flattenTranslations('home', arTranslations.home),
      ...flattenTranslations('lessons', arTranslations.lessons),
      ...flattenTranslations('dictionary', arTranslations.dictionary),
      ...flattenTranslations('about', arTranslations.about),
      ...flattenTranslations('practice', arTranslations.practice),
      ...flattenTranslations('translator', arTranslations.translator),
      ...flattenTranslations('theme', arTranslations.theme),
      ...flattenTranslations('common', arTranslations.common),
    },
  },
  it: {
    translation: {
      ...flattenTranslations('nav', itTranslations.nav),
      ...flattenTranslations('home', itTranslations.home),
      ...flattenTranslations('lessons', itTranslations.lessons),
      ...flattenTranslations('dictionary', itTranslations.dictionary),
      ...flattenTranslations('about', itTranslations.about),
      ...flattenTranslations('practice', itTranslations.practice),
      ...flattenTranslations('translator', itTranslations.translator),
      ...flattenTranslations('theme', itTranslations.theme),
      ...flattenTranslations('common', itTranslations.common),
    },
  },
  vi: {
    translation: {
      ...flattenTranslations('nav', viTranslations.nav),
      ...flattenTranslations('home', viTranslations.home),
      ...flattenTranslations('lessons', viTranslations.lessons),
      ...flattenTranslations('dictionary', viTranslations.dictionary),
      ...flattenTranslations('about', viTranslations.about),
      ...flattenTranslations('practice', viTranslations.practice),
      ...flattenTranslations('translator', viTranslations.translator),
      ...flattenTranslations('theme', viTranslations.theme),
      ...flattenTranslations('common', viTranslations.common),
    },
  },
  tr: {
    translation: {
      ...flattenTranslations('nav', trTranslations.nav),
      ...flattenTranslations('home', trTranslations.home),
      ...flattenTranslations('lessons', trTranslations.lessons),
      ...flattenTranslations('dictionary', trTranslations.dictionary),
      ...flattenTranslations('about', trTranslations.about),
      ...flattenTranslations('practice', trTranslations.practice),
      ...flattenTranslations('translator', trTranslations.translator),
      ...flattenTranslations('theme', trTranslations.theme),
      ...flattenTranslations('common', trTranslations.common),
    },
  },
  de: {
    translation: {
      ...flattenTranslations('nav', deTranslations.nav),
      ...flattenTranslations('home', deTranslations.home),
      ...flattenTranslations('lessons', deTranslations.lessons),
      ...flattenTranslations('dictionary', deTranslations.dictionary),
      ...flattenTranslations('about', deTranslations.about),
      ...flattenTranslations('practice', deTranslations.practice),
      ...flattenTranslations('translator', deTranslations.translator),
      ...flattenTranslations('theme', deTranslations.theme),
      ...flattenTranslations('common', deTranslations.common),
    },
  },
  ha: {
    translation: {
      ...flattenTranslations('nav', haTranslations.nav),
      ...flattenTranslations('home', haTranslations.home),
      ...flattenTranslations('lessons', haTranslations.lessons),
      ...flattenTranslations('dictionary', haTranslations.dictionary),
      ...flattenTranslations('about', haTranslations.about),
      ...flattenTranslations('practice', haTranslations.practice),
      ...flattenTranslations('translator', haTranslations.translator),
      ...flattenTranslations('theme', haTranslations.theme),
      ...flattenTranslations('common', haTranslations.common),
    },
  },
  tl: {
    translation: {
      ...flattenTranslations('nav', tlTranslations.nav),
      ...flattenTranslations('home', tlTranslations.home),
      ...flattenTranslations('lessons', tlTranslations.lessons),
      ...flattenTranslations('dictionary', tlTranslations.dictionary),
      ...flattenTranslations('about', tlTranslations.about),
      ...flattenTranslations('practice', tlTranslations.practice),
      ...flattenTranslations('translator', tlTranslations.translator),
      ...flattenTranslations('theme', tlTranslations.theme),
      ...flattenTranslations('common', tlTranslations.common),
    },
  },
  pl: {
    translation: {
      ...flattenTranslations('nav', plTranslations.nav),
      ...flattenTranslations('home', plTranslations.home),
      ...flattenTranslations('lessons', plTranslations.lessons),
      ...flattenTranslations('dictionary', plTranslations.dictionary),
      ...flattenTranslations('about', plTranslations.about),
      ...flattenTranslations('practice', plTranslations.practice),
      ...flattenTranslations('translator', plTranslations.translator),
      ...flattenTranslations('theme', plTranslations.theme),
      ...flattenTranslations('common', plTranslations.common),
    },
  },
  pt: {
    translation: {
      ...flattenTranslations('nav', ptTranslations.nav),
      ...flattenTranslations('home', ptTranslations.home),
      ...flattenTranslations('lessons', ptTranslations.lessons),
      ...flattenTranslations('dictionary', ptTranslations.dictionary),
      ...flattenTranslations('about', ptTranslations.about),
      ...flattenTranslations('practice', ptTranslations.practice),
      ...flattenTranslations('translator', ptTranslations.translator),
      ...flattenTranslations('theme', ptTranslations.theme),
      ...flattenTranslations('common', ptTranslations.common),
    },
  },
  // Include all the old resources for languages we haven't refactored yet
  ...Object.fromEntries(
    Object.entries(oldResources).filter(([lang]) => !['en', 'es', 'fr', 'tok', 'zh-CN', 'ja', 'ko', 'eo', 'ru', 'ar', 'it', 'vi', 'tr', 'de', 'ha', 'tl', 'pl', 'pt'].includes(lang))
  ),
};

// Handle RTL language direction
function updateDirection() {
  if (typeof document === 'undefined') return;

  const dir = RTL_LANGS.has(i18n.language) ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', i18n.language);
}

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: import.meta.env.DEV,
  }, (err) => {
    if (err) return console.error('i18n initialization error:', err);
    updateDirection();
  });

// Listen for language changes to update direction
i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    const dir = RTL_LANGS.has(lng) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lng);
  }
});

export const isRtlLanguage = (lng: string) => RTL_LANGS.has(lng);
export { RTL_LANGS };
export default i18n;