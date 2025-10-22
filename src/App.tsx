import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BooksPage from './pages/BooksPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import StatisticsPage from './pages/StatisticsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 (Navbar 없음) */}
        <Route path="/" element={<LoginPage />} />

        {/* 대시보드 (Navbar 있음) */}
        <Route path="/dashboard" element={
          <>
            <Navbar />
            <DashboardPage />
          </>
        } />

        {/* 장부 (Navbar 있음) */}
        <Route path="/books" element={
          <>
            <Navbar />
            <BooksPage />
          </>
        } />

        {/* 재무제표 (Navbar 있음) */}
        <Route path="/statistics" element={
          <>
            <Navbar />
            <StatisticsPage />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;