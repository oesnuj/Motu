import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@components/@common/Header/Header.tsx';
import GlobalStyle from '@styles/Global.styles.ts';
import Login from '@/pages/auth/Login/Login';
import SignUp from '@/pages/auth/SignUp/SignUp';
import SignUpEmail from '@pages/auth/SignUpEmail/SignUpEmail.tsx';
import Home from '@pages/@common/Home/Home.tsx';
import PortfolioPage from '@pages/@common/PorfolioPage/PortfolioPage.tsx';
import StocksPage from '@pages/@common/Stock/StockPage.tsx';

/**
 * App 컴포넌트
 * - React Router를 사용하여 애플리케이션의 라우팅을 관리
 * - 글로벌 스타일 적용 및 공통 헤더 포함
 */
function App() {
  return (
    <Router>
      {/* 글로벌 스타일 적용 */}
      <GlobalStyle />
      {/* 공통 헤더 */}
      <Header />
      {/* 라우팅 설정 */}
      <Routes>
        {/* 홈 페이지 */}
        <Route path="/" element={<Home />} />

        {/* 주식 페이지 */}
        <Route path="/stocks" element={<StocksPage />} />

        {/* 포트폴리오 페이지 */}
        <Route path="/portfolio" element={<PortfolioPage />} />

        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />

        {/* 회원가입 페이지 */}
        <Route path="/sign-up" element={<SignUp />} />

        {/* 회원가입 이메일 인증 페이지 */}
        <Route path="/sign-up/email" element={<SignUpEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
