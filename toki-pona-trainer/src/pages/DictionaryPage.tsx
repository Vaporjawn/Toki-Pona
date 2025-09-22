import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  InputAdornment,
  Chip,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

// Mock dictionary data - this will be replaced with real data from the extracted content
const mockDictionary = [
  {
    word: 'mi',
    partOfSpeech: 'pronoun',
    definition: 'I, me, my, we, us, our',
    examples: ['mi pona', 'mi wile moku'],
    sitelen: '/sitelen-pona/mi.png',
  },
  {
    word: 'sina',
    partOfSpeech: 'pronoun',
    definition: 'you, your',
    examples: ['sina pona', 'sina suli'],
    sitelen: '/sitelen-pona/sina.png',
  },
  {
    word: 'pona',
    partOfSpeech: 'adjective',
    definition: 'good, positive, useful, friendly, peaceful, simple',
    examples: ['mi pona', 'tomo pona'],
    sitelen: '/sitelen-pona/pona.png',
  },
  {
    word: 'ike',
    partOfSpeech: 'adjective',
    definition: 'bad, negative, non-essential, evil',
    examples: ['ijo ike', 'tenpo ike'],
    sitelen: '/sitelen-pona/ike.png',
  },
  {
    word: 'suli',
    partOfSpeech: 'adjective',
    definition: 'big, heavy, large, long, tall, important, adult',
    examples: ['jan suli', 'tomo suli'],
    sitelen: '/sitelen-pona/suli.png',
  },
];

const DictionaryPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWords = mockDictionary.filter(
    (word) =>
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('dictionary.title')}
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder={t('dictionary.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 4 }}
        />
      </Box>

      <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
        {filteredWords.length} words found
      </Typography>

      <Box sx={{ display: 'grid', gap: 2 }}>
        {filteredWords.map((word, index) => (
          <Card key={index} sx={{ '&:hover': { boxShadow: 4 } }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                {/* Sitelen Pona Image */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'grey.100',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={word.sitelen}
                    alt={word.word}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'contain',
                    }}
                    onError={(e) => {
                      // Fallback for missing images
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).nextElementSibling!.textContent = word.word;
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ display: 'none', color: 'text.secondary' }}
                  >
                    {word.word}
                  </Typography>
                </Box>

                {/* Word Information */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                      {word.word}
                    </Typography>
                    <Chip
                      label={word.partOfSpeech}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>

                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {word.definition}
                  </Typography>

                  {word.examples && word.examples.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        {t('dictionary.examples')}:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {word.examples.map((example, idx) => (
                          <Chip
                            key={idx}
                            label={example}
                            size="small"
                            variant="outlined"
                            sx={{ bgcolor: 'grey.50' }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {filteredWords.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No words found matching "{searchTerm}"
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try a different search term
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DictionaryPage;