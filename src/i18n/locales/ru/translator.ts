import type { TranslatorTranslations } from '../en/translator';

export const translator: TranslatorTranslations = {
  title: 'Переводчик',
  sourcePlaceholder: 'Введите текст...',
  targetPlaceholder: 'Перевод',
  swap: 'Поменять',
  copy: 'Копировать',
  clear: 'Очистить',
  mode: {
    word: 'Пословно',
    sentence: 'Предложение',
    grammar: 'Грамматика',
  },
  unknownWord: 'Неизвестное слово',
  partialWarning: 'Некоторые слова не удалось перевести',
  direction: {
    autoDetected: 'Автоопределено: {{direction}}',
    tpToEn: 'Toki Pona → Английский',
    enToTp: 'Английский → Toki Pona',
  },
};