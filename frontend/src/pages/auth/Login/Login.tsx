import React, { useState } from 'react';
import Layout from '@/components/@common/Layout/Layout.tsx';
import Form from '@/components/@common/Form/Form.styles.ts';
import BackGroundCardStyles from '@components/@common/BackGroundCard/BackGroundCard.styles.ts';
import InputField from '@components/@common/InputField/InputField.tsx';
import Button from '@components/@common/Button/Button.tsx';
import Title from '@components/@common/Title/Title.tsx';
import CustomLink from '@components/@common/CustomLink/CustomLink.tsx';
import Switch from 'react-switch';
import { login } from '@apis/auth.ts';
import * as Styled from '@/pages/auth/Login/Login.styles.ts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [ipSecure, setIpSecure] = useState(true);

  const handleToggle = () => {
    setIpSecure(!ipSecure);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 초기화
    setError('');
    setLoading(true);

    // 간단한 입력 검증
    if (!email.includes('@')) {
      setError('올바른 이메일 주소를 입력하세요.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      setLoading(false);
      return;
    }

    try {
      const response = await login({ email, password });

      if (response.ok) {
        alert('로그인 성공!');
        // 리다이렉트나 인증 상태 갱신 가능
        window.location.href = '/dashboard';
      } else {
        const data = await response.json();
        setError(data.message || '로그인 실패');
      }
    } catch (error) {
      setError(`서버와 통신에 실패했습니다. ${error}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <BackGroundCardStyles>
        <Form onClick={handleSubmit}>
          <Title>로그인하고 안전하게 투자연습을 시작해보세요!</Title>
          <InputField
            type="email"
            placeholder="example@motu.io"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
          <InputField
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
          />
          <Styled.ToggleWrapper>
            <Switch
              checked={ipSecure}
              onChange={handleToggle}
              onColor="#1a73e8" // 스위치 ON 배경색
              offColor="#ccc" // 스위치 OFF 배경색
              uncheckedIcon={false}
              checkedIcon={false}
            />
            <Styled.ToggleLabel isOn={ipSecure}>
              {ipSecure ? '  IP 보안 ON' : '  IP 보안 OFF'}
            </Styled.ToggleLabel>
          </Styled.ToggleWrapper>
          <Button type="submit" text={loading ? '로그인 중...' : '로그인'} />
        </Form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <CustomLink to="/sign-up" text="회원가입" />
          <CustomLink to="/forgot-password" text="아이디 · 비밀번호 찾기" />
        </div>
      </BackGroundCardStyles>
    </Layout>
  );
};

export default Login;
