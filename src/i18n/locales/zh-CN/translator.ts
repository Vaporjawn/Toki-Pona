import type { TranslatorTranslations } from '../en/translator';

const translator: TranslatorTranslations = {
  title: '翻译器',
  sourcePlaceholder: '输入文本...',
  targetPlaceholder: '译文',
  swap: '交换',
  copy: '复制',
  clear: '清除',

  mode: {
    word: '逐词',
    sentence: '句子',
    grammar: '语法',
  },

  unknownWord: '未知词',
  partialWarning: '部分词无法翻译',

  direction: {
    autoDetected: '自动检测：{{direction}}',
    tpToEn: 'Toki Pona → 英语',
    enToTp: '英语 → Toki Pona',
  },
};

export default translator;