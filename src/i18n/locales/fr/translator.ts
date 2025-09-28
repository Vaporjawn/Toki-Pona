import type { TranslatorTranslations } from '../en/translator';

export const translator: TranslatorTranslations = {
  title: 'Traducteur',
  sourcePlaceholder: 'Entrez du texte...',
  targetPlaceholder: 'Traduction',
  swap: 'Permuter',
  copy: 'Copier',
  clear: 'Effacer',
  mode: {
    word: 'Mot à mot',
    sentence: 'Phrase',
    grammar: 'Grammaire'
  },
  unknownWord: 'Mot inconnu',
  partialWarning: 'Certains mots n\'ont pas pu être traduits',
  direction: {
    autoDetected: 'Auto-détecté : {{direction}}',
    tpToEn: 'Toki Pona → Anglais',
    enToTp: 'Anglais → Toki Pona'
  }
};