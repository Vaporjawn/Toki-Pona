import type { TranslatorTranslations } from '../en/translator';

export const translator: TranslatorTranslations = {
  title: '번역기',
  sourcePlaceholder: '텍스트 입력...',
  targetPlaceholder: '번역 결과',
  swap: '교환',
  copy: '복사',
  clear: '지우기',

  mode: {
    word: '단어별',
    sentence: '문장',
    grammar: '문법',
  },

  unknownWord: '알 수 없는 단어',
  partialWarning: '일부 단어는 번역되지 않았습니다',

  direction: {
    autoDetected: '자동 감지: {{direction}}',
    tpToEn: 'Toki Pona → 영어',
    enToTp: '영어 → Toki Pona',
  },
};