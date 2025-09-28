import type { TranslatorTranslations } from '../en/translator';

export const translator: TranslatorTranslations = {
  title: '翻訳ツール',
  sourcePlaceholder: 'テキストを入力...',
  targetPlaceholder: '翻訳',
  swap: '入れ替え',
  copy: 'コピー',
  clear: 'クリア',

  mode: {
    word: '単語ごと',
    sentence: '文',
    grammar: '文法',
  },

  unknownWord: '不明な語',
  partialWarning: '一部の語を翻訳できません',

  direction: {
    autoDetected: '自動検出: {{direction}}',
    tpToEn: 'Toki Pona → 英語',
    enToTp: '英語 → Toki Pona',
  },
};