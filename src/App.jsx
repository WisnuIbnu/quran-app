import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; // sesuaikan path
import Quran from './pages/Quran';
import SurahDetail from './pages/SurahDetail';
import NotFound from './pages/NotFound';
import UnderDevelopment from './pages/UnderDevelopment';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quran" element={<Quran />} />
          <Route path="/surah/:id" element={<SurahDetail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/under-development" element={<UnderDevelopment />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;