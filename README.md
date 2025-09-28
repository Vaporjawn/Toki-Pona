# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
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

### Contributing Translations

Please keep structural parity across locales:

- Maintain identical lesson section ordering and keys.
- Supply culturally appropriate, neutral phrasing.
- Avoid hard‑coding direction-specific styling—direction is handled globally.

---
You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
