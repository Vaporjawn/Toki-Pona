import type { TranslatorTranslations } from '../en/translator';

export const translator: TranslatorTranslations = {
  title: 'Tradukilo',
  sourcePlaceholder: 'Enigu tekston...',
  targetPlaceholder: 'Traduko',
  swap: 'Interŝanĝi',
  copy: 'Kopii',
  clear: 'Vakigi',
  mode: {
    word: 'Vorto-post-vorto',
    sentence: 'Frazo',
    grammar: 'Gramatiko',
  },
  unknownWord: 'Nekonata vorto',
  partialWarning: 'Iuj vortoj ne povis esti tradukitaj',
  direction: {
    autoDetected: 'Aŭtomate detektita: {{direction}}',
    tpToEn: 'Toki Pona → la angla',
    enToTp: 'La angla → Toki Pona',
  },
};