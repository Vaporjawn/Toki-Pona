import type { TranslatorTranslations } from '../en/translator';

export const translator: TranslatorTranslations = {
  title: 'Übersetzer',
  sourcePlaceholder: 'Text eingeben...',
  targetPlaceholder: 'Übersetzung',
  swap: 'Tauschen',
  copy: 'Kopieren',
  clear: 'Löschen',
  mode: {
    word: 'Wort-für-Wort',
    sentence: 'Satz',
    grammar: 'Grammatik',
  },
  unknownWord: 'Unbekanntes Wort',
  partialWarning: 'Einige Wörter konnten nicht übersetzt werden',
  direction: {
    autoDetected: 'Automatisch erkannt: {{direction}}',
    tpToEn: 'Toki Pona → Deutsch',
    enToTp: 'Deutsch → Toki Pona',
  },
};