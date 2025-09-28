import type { TranslatorTranslations } from '../en/translator';

export const translator: TranslatorTranslations = {
  title: 'Dịch Thuật',
  sourcePlaceholder: 'Nhập văn bản...',
  targetPlaceholder: 'Bản dịch',
  swap: 'Hoán đổi',
  copy: 'Sao chép',
  clear: 'Xóa',
  mode: {
    word: 'Từng từ',
    sentence: 'Câu',
    grammar: 'Ngữ pháp',
  },
  unknownWord: 'Từ không xác định',
  partialWarning: 'Một số từ không thể dịch được',
  direction: {
    autoDetected: 'Tự động phát hiện: {{direction}}',
    tpToEn: 'Toki Pona → Tiếng Việt',
    enToTp: 'Tiếng Việt → Toki Pona',
  },
};