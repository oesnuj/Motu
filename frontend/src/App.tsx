import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@components/@common/Header/Header.tsx';
import GlobalStyle from '@styles/Global.styles.ts';
import Login from '@/pages/auth/Login/Login';
import SignUp from '@/pages/auth/SignUp/SignUp';
import SignUpEmail from '@pages/auth/SignUpEmail/SignUpEmail.tsx';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-up/email" element={<SignUpEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
