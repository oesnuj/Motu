import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@components/@common/Header/Header.tsx';
import GlobalStyle from '@styles/Global.styles.ts';
import Login from '@/pages/auth/Login/Login';
import SignUp from '@/pages/auth/SignUp/SignUp';
import SignUpEmail from '@pages/auth/SignUpEmail/SignUpEmail.tsx';
import Home from '@pages/@common/Home/Home.tsx';
import PortfolioPage from '@pages/@common/PorfolioPage/PortfolioPage.tsx';
import StocksPage from '@pages/@common/Stock/StockPage.tsx';
import ProtectedRoute from '@/components/auth/ProtectedRoute.tsx';
import { AuthProvider } from '@/components/auth/AuthContext.tsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          {/* 누구나 접근 가능한 페이지 */}
          <Route path="/" element={<Home />} /> {/* 메인 페이지 */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-up/email" element={<SignUpEmail />} />
          {/* 보호된 경로 (로그인 필요) */}
          <Route
            path="/stocks"
            element={
              <ProtectedRoute>
                <StocksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <PortfolioPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
