import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LearningPage } from './pages/LearningPage';
import { TestIntroPage } from './pages/TestIntroPage';
import { QuizPage } from './pages/QuizPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/intro/:testId" element={<TestIntroPage />} />
        <Route path="/quiz/:testId" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
