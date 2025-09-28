import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Chip,
  Paper,
  InputAdornment,
  Avatar
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { searchTranslatedWords, type SupportedLanguage, type TranslatedWordEntry } from '../data/dictionary-utils';

const DictionaryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter words based on search term with current language
  const filteredWords: TranslatedWordEntry[] = useMemo(() => {
    const currentLanguage = i18n.language as SupportedLanguage;
    return searchTranslatedWords(searchTerm, currentLanguage);
  }, [searchTerm, i18n.language]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('dictionary.title')}
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        {t('dictionary.completeDescription')}
      </Typography>

      {/* Search Field */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder={t('dictionary.search') || 'Search words...'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {/* Results Count */}
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {t('dictionary.wordsFound', { count: filteredWords.length })}
      </Typography>

      {/* Dictionary Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2
        }}
      >
        {filteredWords.map((word) => (
          <Card
            key={word.word}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3
              }
            }}
          >
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Word Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={word.sitelen}
                    alt={`sitelen pona for ${word.word}`}
                    sx={{
                      width: 40,
                      height: 40,
                      mr: 2,
                      bgcolor: 'primary.light'
                    }}
                  >
                    {word.word.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="h5" component="h2" color="primary">
                    {word.word}
                  </Typography>
                </Box>

                {/* Parts of Speech */}
                <Box sx={{ mb: 2 }}>
                  {word.partOfSpeech.map((pos) => (
                    <Chip
                      key={pos}
                      label={pos}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>

                {/* Definitions */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {t('dictionary.definitions')}
                  </Typography>
                  {word.definitions.map((definition, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{ mb: 0.5, pl: 1 }}
                    >
                      • {definition}
                    </Typography>
                  ))}
                </Box>

                {/* Examples */}
                {word.examples.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      {t('dictionary.examples')}
                    </Typography>
                    {word.examples.slice(0, 3).map((example, index) => (
                      <Paper
                        key={index}
                        sx={{
                          p: 1,
                          mb: 0.5,
                          bgcolor: 'grey.50',
                          fontSize: '0.875rem'
                        }}
                      >
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                          {example}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                )}

                {/* Etymology */}
                {word.etymology && (
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {t('dictionary.etymology')} {word.etymology}
                    </Typography>
                  </Box>
                )}

                {/* Categories */}
                {word.categories.length > 0 && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {t('dictionary.categories')} {word.categories.join(', ')}
                    </Typography>
                  </Box>
                )}

                {/* Notes */}
                {word.notes && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="info.main">
                      {t('dictionary.note')} {word.notes}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
        ))}
      </Box>

      {/* No Results Message */}
      {filteredWords.length === 0 && searchTerm && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            {t('dictionary.noResults')} "{searchTerm}"
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('dictionary.noResultsDesc')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DictionaryPage;