import { useState, useEffect } from 'react';
import * as Styled from '@/components/@common/Header/Header.styles';
import { Link } from 'react-router-dom';
import motoLogo from '@/assets/images/motoLogo.png'; // 로고 이미지 경로

const Header = () => {
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부
  const [sessionTime, setSessionTime] = useState(0); // 남은 세션 시간 (초 단위)

  // 로그인 시 서버에서 세션 시간 가져오기
  useEffect(() => {
    if (isLogin) {
      //Todo 세션시간 받아오기
    }
  }, [isLogin]);

  // 세션 타이머 관리
  useEffect(() => {
    let timer: any;

    if (isLogin && sessionTime > 0) {
      timer = setInterval(() => {
        setSessionTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer!);
            handleSessionExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLogin, sessionTime]);

  // 서버에서 세션 시간 가져오기

  // 세션 만료 처리
  const handleSessionExpired = () => {
    setIsLogin(false);
    alert('세션이 만료되었습니다. 다시 로그인하세요.');
  };

  // 세션 연장 처리
  const handleExtendSession = async () => {
    try {
      const response = await fetch('/api/extend-session', { method: 'POST' });
      const data = await response.json();
      setSessionTime(data.newSessionTime); // 연장된 세션 시간 설정
      alert('세션이 연장되었습니다.');
    } catch (error) {
      console.error('Failed to extend session:', error);
    }
  };

  return (
    <Styled.HeaderContainer>
      <Logo />

      <Styled.Nav>
        <Link to="/">홈</Link>
        <Link to="/stocks">주식 골라보기</Link>
        <Link to="/portfolio">포트폴리오</Link>
      </Styled.Nav>

      <Styled.Nav>
        {isLogin ? (
          <>
            <Styled.SessionTime>
              남은 세션: {Math.floor(sessionTime / 60)}분 {sessionTime % 60}초
            </Styled.SessionTime>
            <span onClick={handleExtendSession}>연장</span>
            <Link to="/home" onClick={() => setIsLogin(false)}>
              로그아웃
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/sign-up">회원가입</Link>
          </>
        )}
      </Styled.Nav>
    </Styled.HeaderContainer>
  );
};

// 로고 컴포넌트
const Logo = () => {
  return (
    <Styled.LogoWrapper to="/">
      <Styled.LogoImage src={motoLogo} alt="모투 로고" />
      <Styled.LogoText>모투</Styled.LogoText>
    </Styled.LogoWrapper>
  );
};

export default Header;
