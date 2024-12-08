import React, { useState } from 'react';
import Layout from '@/components/@common/Layout/Layout.tsx';
import Form from '@/components/@common/Form/Form.styles.ts';
import BackGroundCardStyles from '@components/@common/BackGroundCard/BackGroundCard.styles.ts';
import InputField from '@components/@common/InputField/InputField.tsx';
import Button from '@components/@common/Button/Button.tsx';
import Title from '@components/@common/Title/Title.tsx';
import CustomLink from '@components/@common/CustomLink/CustomLink.tsx';
import { signUp } from '@apis/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (username.length < 2 || username.length > 20) {
      setError('닉네임은 2~20자 사이여야 합니다.');
      setLoading(false);
      return;
    }
    if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
      setError('비밀번호는 8자 이상이며 특수문자를 포함해야 합니다.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    try {
      const response = await signUp({ username, email, password });

      if (response.ok) {
        alert('회원가입 성공!');
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
      } else {
        const data = await response.json();
        setError(data.message || '회원가입 실패');
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
        <Form onSubmit={handleSubmit}>
          <Title>회원가입하고 투자 여정을 시작하세요!</Title>
          <InputField
            type="email"
            placeholder="example@motu.io"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
          <InputField
            type="text"
            placeholder="닉네임 (2~20자)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={error}
          />
          <InputField
            type="password"
            placeholder="비밀번호 (8자 이상, 특수문자 포함)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
          />
          <InputField
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error}
          />
          <Button
            type="submit"
            text={loading ? '회원가입 중...' : '회원가입'}
          />
        </Form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <CustomLink to="/login" text="이미 계정이 있으신가요? 로그인" />
        </div>
      </BackGroundCardStyles>
    </Layout>
  );
};

export default SignUp;
