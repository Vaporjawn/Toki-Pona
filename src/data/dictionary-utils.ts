// Dictionary translation utilities
import { tokiPonaDictionary } from './dictionary';
import type { WordEntry } from './dictionary';
import { dictionaryTranslations } from './dictionary-translations.ts';

export type SupportedLanguage = 'en' | 'es' | 'fr' | 'tok' | 'zh-CN' | 'ja' | 'ko' | 'eo';

export interface TranslatedWordEntry extends Omit<WordEntry, 'definitions' | 'examples'> {
  definitions: string[];
  examples: string[];
}

/**
 * Get translated definitions and examples for a word
 */
export function getTranslatedWord(word: string, language: SupportedLanguage): TranslatedWordEntry | null {
  const baseWord = tokiPonaDictionary.find(w => w.word === word);
  if (!baseWord) return null;

  const translations = dictionaryTranslations[word];

  if (translations) {
    // Use translated versions if available
    return {
      ...baseWord,
      definitions: translations.definitions[language] || baseWord.definitions,
      examples: translations.examples[language] || baseWord.examples
    };
  }

  // Fall back to original English if no translation available
  return baseWord;
}

/**
 * Get all translated words for a specific language
 */
export function getTranslatedDictionary(language: SupportedLanguage): TranslatedWordEntry[] {
  return tokiPonaDictionary.map(word => {
    const translated = getTranslatedWord(word.word, language);
    return translated || word;
  });
}

/**
 * Search translated words
 */
export function searchTranslatedWords(searchTerm: string, language: SupportedLanguage): TranslatedWordEntry[] {
  const translatedDict = getTranslatedDictionary(language);

  if (!searchTerm.trim()) {
    return translatedDict;
  }

  const query = searchTerm.toLowerCase();

  return translatedDict.filter(word => {
    // Search in word name
    if (word.word.toLowerCase().includes(query)) {
      return true;
    }

    // Search in definitions
    if (word.definitions.some(def => def.toLowerCase().includes(query))) {
      return true;
    }

    // Search in examples
    if (word.examples.some(example => example.toLowerCase().includes(query))) {
      return true;
    }

    // Search in categories
    if (word.categories.some(cat => cat.toLowerCase().includes(query))) {
      return true;
    }

    return false;
  });
}

/**
 * Get translation coverage statistics
 */
export function getTranslationCoverage(): {
  totalWords: number;
  translatedWords: number;
  coverage: number;
} {
  const totalWords = tokiPonaDictionary.length;
  const translatedWords = Object.keys(dictionaryTranslations).length;
  const coverage = Math.round((translatedWords / totalWords) * 100);

  return {
    totalWords,
    translatedWords,
    coverage
  };
}