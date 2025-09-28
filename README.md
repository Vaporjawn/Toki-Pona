# Toki Pona Trainer 🌱

A comprehensive, multilingual web application for learning Toki Pona - the minimalist constructed language with only 137 words. Built with React, TypeScript, and Material-UI, featuring an intuitive interface, interactive lessons, practice exercises, and a complete dictionary.

## ✨ Features

- 📚 **Interactive Lessons**: Step-by-step learning modules covering Toki Pona grammar, vocabulary, and usage
- 📖 **Comprehensive Dictionary**: Full dictionary with definitions, examples, and usage notes for all official words
- 🎯 **Practice Exercises**: Various exercise types including flashcards, translation practice, and comprehension tests
- 📊 **Progress Analytics**: Track your learning progress with detailed statistics and achievement system
- 🌍 **Multilingual Interface**: Available in 10+ languages with full RTL support for Arabic
- 🎨 **Modern UI**: Clean, responsive design with dark/light theme support
- 🔄 **Translator Tool**: Bidirectional translation between Toki Pona and supported languages
- 🏆 **Achievement System**: Unlock badges and track milestones as you progress
- 📱 **Mobile Responsive**: Optimized for desktop, tablet, and mobile devices

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Vaporjawn/Toki-Pona.git
cd Toki-Pona

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Material-UI
- **Routing**: React Router DOM
- **Internationalization**: i18next, react-i18next
- **Build Tool**: Vite
- **Testing**: Vitest
- **Linting**: ESLint with TypeScript support
- **Styling**: Emotion (CSS-in-JS), Material-UI theming

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
├── contexts/          # React contexts (Theme, Progress)
├── data/             # Static data (lessons, dictionary)
├── hooks/            # Custom React hooks
├── i18n/             # Internationalization setup and translations
├── pages/            # Main application pages
├── utils/            # Utility functions and helpers
└── assets/           # Static assets (images, icons)

public/
├── locales/          # Translation files
└── sitelen-pona/     # Toki Pona hieroglyphic script assets
```

## Localization & Internationalization

This project includes a multilingual interface and lesson content using **i18next** + **react-i18next**.

### Supported UI Locales

Code | Language (English) | Native Name | Direction
---- | ------------------ | ----------- | ---------
`en` | English            | English     | LTR
`es` | Spanish            | Español     | LTR
`fr` | French             | Français    | LTR
`tok`| Toki Pona          | toki pona   | LTR
`zh-CN` | Chinese (Simplified) | 中文 (简体) | LTR
`ja` | Japanese           | 日本語      | LTR
`ko` | Korean             | 한국어      | LTR
`eo` | Esperanto          | Esperanto   | LTR
`ru` | Russian            | Русский     | LTR
`ar` | Arabic             | العربية     | RTL

### Placeholder Locales (UI Only)

The following locales have been scaffolded with English strings (placeholders) so the interface can switch to them without missing keys. Community contributions are welcome to replace each string with a proper translation. Content-restricted areas (lessons, dictionary examples) may still appear primarily in English until expanded.

Code | Language (English) | Native Name | Direction | Status
---- | ------------------ | ----------- | --------- | -------
`it` | Italian            | Italiano    | LTR       | Placeholder (needs translation)
`vi` | Vietnamese         | Tiếng Việt  | LTR       | Placeholder
`de` | German             | Deutsch     | LTR       | Placeholder
`ha` | Hausa              | Hausa       | LTR       | Placeholder
`pl` | Polish             | Polski      | LTR       | Placeholder
`pt` | Portuguese         | Português   | LTR       | Placeholder (consider regional variants)
`tl` | Tagalog            | Tagalog     | LTR       | Placeholder
`tr` | Turkish            | Türkçe      | LTR       | Placeholder

To help: edit `src/i18n.ts`, locate the placeholder injection section, and replace values (remove the `_placeholder_note` key if fully translated). Then add yourself to CONTRIBUTORS (if file exists or create one) and open a PR.

### RTL Support

Arabic (`ar`) activates right‑to‑left layout automatically. A listener in `src/i18n.ts` updates:

- `document.documentElement.dir` → `rtl` for Arabic, else `ltr`
- `document.documentElement.lang` → current language code

If you add another RTL language (e.g. Hebrew `he`, Persian `fa`), add its code to the `RTL_LANGS` set in `src/i18n.ts`.

### Adding a New UI Locale

1. Open `src/i18n.ts` and append a new language object under `resources` matching existing key groups (nav, home, lessons, dictionary, about, practice, theme, common).
2. (Optional) If the locale is RTL, add its code to `RTL_LANGS`.
3. Add the locale entry (code, English name, native name, flag) to `languages` array in `src/components/LanguageSelector.tsx`.
4. Provide lesson content translations (if desired) in `src/data/lesson-translations.ts` mirroring the structure of existing locales.
5. (Dictionary) Extend `dictionary-translations.ts` with new definition/example arrays per word if needed.
6. Run type check: `npm run typecheck` (or `tsc --noEmit`) to ensure no missing keys or shape mismatches.

### Fallback Behavior

If a translation key is missing in the selected locale, i18next falls back to English (`fallbackLng: 'en'`). Lesson and dictionary helpers also gracefully fall back to English content when a target language entry is absent.

### Guidelines for Translation Contributors

Please maintain consistency across locales:

- Keep identical lesson section ordering and translation keys
- Use culturally appropriate, neutral phrasing
- Avoid hardcoding direction-specific styling (handled globally)
- Test your translations thoroughly before submitting
- Follow the existing code style and structure

## 📚 About Toki Pona

Toki Pona is a philosophical artistic constructed language created by Canadian linguist Sonja Lang in 2001. With only 137 official words, it's designed to express maximal meaning with minimal complexity, encouraging speakers to break down complex thoughts into simple, fundamental concepts.

### Core Philosophy
- **Minimalism**: Express complex ideas with simple vocabulary
- **Clarity**: Focus on essential meaning rather than elaborate detail
- **Universality**: Concepts that transcend cultural and linguistic barriers
- **Mindfulness**: Deliberate thought about what we really want to communicate

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes following the existing code style
4. Add tests for new functionality
5. Run the test suite to ensure everything works
6. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
7. Push to the branch (`git push origin feature/AmazingFeature`)
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Sonja Lang** - Creator of Toki Pona
- **Toki Pona Community** - For resources, feedback, and inspiration
- **Contributors** - Everyone who has contributed translations, code, or feedback
- **Open Source Libraries** - React, Material-UI, i18next, and all other dependencies

## 📞 Support

If you have questions, suggestions, or need help:

- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Open an issue with the "enhancement" label
- 💬 **General Questions**: Start a discussion on GitHub
- 🌐 **Translation Help**: Check the translation guidelines above

---

**pona tawa sina!** (Good luck to you!) 🌱

## 🎯 Pages & Features

- **Home**: Landing page with overview and quick access to main features
- **Lessons**: Structured learning modules covering Toki Pona fundamentals
- **Dictionary**: Searchable dictionary with examples and usage notes
- **Practice**: Interactive exercises and quizzes to test your knowledge
- **Translator**: Bidirectional translation tool with context awareness
- **Analytics**: Detailed progress tracking and learning statistics
- **Achievements**: Badge system to gamify the learning experience
- **Settings**: Customize interface language, theme, and preferences
- **About**: Information about Toki Pona, the project, and contributors

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Available Scripts

```bash
npm start          # Start development server
npm run dev        # Alternative dev command
npm run build      # Build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build
npm test           # Run tests
npm run test:ui    # Run tests with UI
npm run test:ci    # Run tests with coverage
npm run test:watch # Run tests in watch mode
```

### Code Quality

This project uses:
- **ESLint** with TypeScript-aware rules
- **TypeScript** in strict mode
- **Vitest** for testing with coverage reports
- **Prettier** integration (via ESLint)

### Type Checking

```bash
npx tsc --noEmit  # Check types without emitting files
```

## 🌍 Contributing Translations

We welcome contributions to expand language support! Here's how to add or improve translations:
