import type { TranslatorTranslations } from '../en/translator';

export const translator: TranslatorTranslations = {
  title: 'Tłumacz',
  sourcePlaceholder: 'Wprowadź tekst...',
  targetPlaceholder: 'Tłumaczenie',
  swap: 'Zamień',
  copy: 'Kopiuj',
  clear: 'Wyczyść',
  mode: {
    word: 'Słowo po słowie',
    sentence: 'Zdanie',
    grammar: 'Gramatyka',
  },
  unknownWord: 'Nieznane słowo',
  partialWarning: 'Niektóre słowa nie mogą być przetłumaczone',
  direction: {
    autoDetected: 'Automatycznie wykryto: {{direction}}',
    tpToEn: 'Toki Pona → Polski',
    enToTp: 'Polski → Toki Pona',
  },
};