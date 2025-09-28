import type { TranslatorTranslations } from '../en/translator';

export const translator: TranslatorTranslations = {
  title: 'Traductor',
  sourcePlaceholder: 'Ingresa texto...',
  targetPlaceholder: 'Traducción',
  swap: 'Intercambiar',
  copy: 'Copiar',
  clear: 'Limpiar',
  mode: {
    word: 'Palabra por palabra',
    sentence: 'Oración',
    grammar: 'Gramática',
  },
  unknownWord: 'Palabra desconocida',
  partialWarning: 'Algunas palabras no se pudieron traducir',
  direction: {
    autoDetected: 'Detección automática: {{direction}}',
    tpToEn: 'Toki Pona → Inglés',
    enToTp: 'Inglés → Toki Pona',
  },
};