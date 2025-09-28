import type { TranslatorTranslations } from '../en/translator';

export const translator: TranslatorTranslations = {
  title: 'Traduttore',
  sourcePlaceholder: 'Inserisci testo...',
  targetPlaceholder: 'Traduzione',
  swap: 'Scambia',
  copy: 'Copia',
  clear: 'Cancella',
  mode: {
    word: 'Parola per parola',
    sentence: 'Frase',
    grammar: 'Grammatica',
  },
  unknownWord: 'Parola sconosciuta',
  partialWarning: 'Alcune parole non possono essere tradotte',
  direction: {
    autoDetected: 'Rilevato automaticamente: {{direction}}',
    tpToEn: 'Toki Pona → Inglese',
    enToTp: 'Inglese → Toki Pona',
  },
};