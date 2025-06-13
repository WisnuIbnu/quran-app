import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; // sesuaikan path
import Home from './pages/Home';
import SurahDetail from './pages/SurahDetail';
import NotFound from './pages/NotFound';
import UnderDevelopment from './pages/UnderDevelopment';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/quran" element={<Home />} />
          <Route path="/surah/:id" element={<SurahDetail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<UnderDevelopment />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;