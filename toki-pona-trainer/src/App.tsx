import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n'; // Initialize i18n
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import LessonDetailPage from './pages/LessonDetailPage';
import DictionaryPage from './pages/DictionaryPage';
import PracticePage from './pages/PracticePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/lessons/:lessonId" element={<LessonDetailPage />} />
            <Route path="/dictionary" element={<DictionaryPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
