import type { TranslatorTranslations } from '../en/translator';

const translator: TranslatorTranslations = {
  title: 'ilo ante toki',
  sourcePlaceholder: 'o sitelen e toki...',
  targetPlaceholder: 'ante toki',
  swap: 'ante',
  copy: 'kama jo',
  clear: 'weka',

  mode: {
    word: 'nimi taso',
    sentence: 'toki nimi mute',
    grammar: 'toki nasin',
  },

  unknownWord: 'nimi sona ala',
  partialWarning: 'nimi ante li ken ala ante',

  direction: {
    autoDetected: 'sona ilo: {{direction}}',
    tpToEn: 'toki pona → en',
    enToTp: 'en → toki pona',
  },
};

export default translator;