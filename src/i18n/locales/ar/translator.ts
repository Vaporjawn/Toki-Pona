import type { TranslatorTranslations } from '../en/translator';

export const translator: TranslatorTranslations = {
  title: 'المترجم',
  sourcePlaceholder: 'أدخل النص...',
  targetPlaceholder: 'الترجمة',
  swap: 'بدل',
  copy: 'انسخ',
  clear: 'امسح',
  mode: {
    word: 'كلمة بكلمة',
    sentence: 'الجملة',
    grammar: 'القواعد',
  },
  unknownWord: 'كلمة غير معروفة',
  partialWarning: 'لم يمكن ترجمة بعض الكلمات',
  direction: {
    autoDetected: 'اكتشاف تلقائي: {{direction}}',
    tpToEn: 'توكي بونا ← الإنجليزية',
    enToTp: 'الإنجليزية ← توكي بونا',
  },
};