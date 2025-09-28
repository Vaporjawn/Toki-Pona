export interface TranslatorTranslations {
  title: string;
  sourcePlaceholder: string;
  targetPlaceholder: string;
  swap: string;
  copy: string;
  clear: string;
  mode: {
    word: string;
    sentence: string;
    grammar: string;
  };
  unknownWord: string;
  partialWarning: string;
  direction: {
    autoDetected: string;
    tpToEn: string;
    enToTp: string;
  };
}

export const translator: TranslatorTranslations = {
  title: 'Translator',
  sourcePlaceholder: 'Enter text...',
  targetPlaceholder: 'Translation',
  swap: 'Swap',
  copy: 'Copy',
  clear: 'Clear',
  mode: {
    word: 'Word-by-word',
    sentence: 'Sentence',
    grammar: 'Grammar',
  },
  unknownWord: 'Unknown word',
  partialWarning: 'Some words could not be translated',
  direction: {
    autoDetected: 'Auto-detected: {{direction}}',
    tpToEn: 'Toki Pona → English',
    enToTp: 'English → Toki Pona',
  },
};