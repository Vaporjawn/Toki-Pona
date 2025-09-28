export interface DictionaryTranslations {
  title: string;
  completeDescription: string;
  search: string;
  wordsFound: string;
  definitions: string;
  examples: string;
  etymology: string;
  categories: string;
  note: string;
  noResults: string;
  noResultsDesc: string;
}

export const dictionary: DictionaryTranslations = {
  title: 'Toki Pona Dictionary',
  completeDescription: 'Complete Toki Pona dictionary with all official words, definitions, and examples.',
  search: 'Search words...',
  wordsFound: '{{count}} words found',
  definitions: 'Definitions:',
  examples: 'Examples:',
  etymology: 'Etymology:',
  categories: 'Categories:',
  note: 'Note:',
  noResults: 'No words found matching',
  noResultsDesc: 'Try a different search term or browse all words',
};