import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AnalysisPage from './pages/AnalysisPage';
import BooksPage from './pages/BooksPage';
import DashboardPage from './pages/DashboardPage';
import LedgerPage from './pages/LedgerPage';
import LoginPage from './pages/LoginPage';

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

        {/* 경영 분석 (Navbar 있음) */}
        <Route path="/analysis" element={
          <>
            <Navbar />
            <AnalysisPage />
          </>
        } />

        {/* 회계 장부 (Navbar 있음) */}
        <Route path="/ledger" element={
          <>
            <Navbar />
            <LedgerPage />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;