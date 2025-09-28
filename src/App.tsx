import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n/index'; // Initialize new modular i18n
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { ProgressProvider } from './contexts/ProgressContext.tsx';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import LessonDetailPage from './pages/LessonDetailPage';
import DictionaryPage from './pages/DictionaryPage';
import PracticePage from './pages/PracticePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import AchievementsPage from './pages/AchievementsPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import TranslatorPage from './pages/TranslatorPage';

function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lessons" element={<LessonsPage />} />
              <Route path="/lessons/:lessonId" element={<LessonDetailPage />} />
              <Route path="/dictionary" element={<DictionaryPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/translator" element={<TranslatorPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Layout>
        </Router>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;
