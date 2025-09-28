import type { TranslatorTranslations } from '../en/translator';

export const translator: TranslatorTranslations = {
  title: 'Tradutor',
  sourcePlaceholder: 'Digite o texto...',
  targetPlaceholder: 'Tradução',
  swap: 'Trocar',
  copy: 'Copiar',
  clear: 'Limpar',
  mode: {
    word: 'Palavra por palavra',
    sentence: 'Frase',
    grammar: 'Gramática',
  },
  unknownWord: 'Palavra desconhecida',
  partialWarning: 'Algumas palavras não podem ser traduzidas',
  direction: {
    autoDetected: 'Detectado automaticamente: {{direction}}',
    tpToEn: 'Toki Pona → Português',
    enToTp: 'Português → Toki Pona',
  },
};