// Quick test to verify dictionary translations are working
import { getTranslatedWord, searchTranslatedWords } from './src/data/dictionary-utils.js';

console.log('Testing dictionary translations...');

// Test getting a translated word
const wordA = getTranslatedWord('a', 'es');
console.log('Word "a" in Spanish:', wordA);

// Test searching translated words
const searchResults = searchTranslatedWords('animal', 'es');
console.log('Search for "animal" in Spanish:', searchResults);

// Test different language
const wordAkesi = getTranslatedWord('akesi', 'fr');
console.log('Word "akesi" in French:', wordAkesi);