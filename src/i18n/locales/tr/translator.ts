import type { TranslatorTranslations } from '../en/translator';

export const translator: TranslatorTranslations = {
  title: 'Çevirmen',
  sourcePlaceholder: 'Metin girin...',
  targetPlaceholder: 'Çeviri',
  swap: 'Değiştir',
  copy: 'Kopyala',
  clear: 'Temizle',
  mode: {
    word: 'Kelime kelime',
    sentence: 'Cümle',
    grammar: 'Gramer',
  },
  unknownWord: 'Bilinmeyen kelime',
  partialWarning: 'Bazı kelimeler çevrilemedi',
  direction: {
    autoDetected: 'Otomatik tespit edildi: {{direction}}',
    tpToEn: 'Toki Pona → Türkçe',
    enToTp: 'Türkçe → Toki Pona',
  },
};