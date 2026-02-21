import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GuestRoute from './components/auth/GuestRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import AnalysisPage from './pages/AnalysisPage';
import BooksPage from './pages/BooksPage';
import DashboardPage from './pages/DashboardPage';
import LedgerPage from './pages/LedgerPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/ledger" element={<LedgerPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
