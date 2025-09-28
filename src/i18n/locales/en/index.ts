import { nav, type NavTranslations } from './nav';
import { home, type HomeTranslations } from './home';
import { lessons, type LessonsTranslations } from './lessons';
import { dictionary, type DictionaryTranslations } from './dictionary';
import { about, type AboutTranslations } from './about';
import { practice, type PracticeTranslations } from './practice';
import { translator, type TranslatorTranslations } from './translator';
import { theme, type ThemeTranslations } from './theme';
import { common, type CommonTranslations } from './common';

export interface EnglishTranslations {
  nav: NavTranslations;
  home: HomeTranslations;
  lessons: LessonsTranslations;
  dictionary: DictionaryTranslations;
  about: AboutTranslations;
  practice: PracticeTranslations;
  translator: TranslatorTranslations;
  theme: ThemeTranslations;
  common: CommonTranslations;
}

export const en: EnglishTranslations = {
  nav,
  home,
  lessons,
  dictionary,
  about,
  practice,
  translator,
  theme,
  common,
};

export default en;