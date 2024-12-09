import Button from '@components/@common/Button/Button.tsx';
import Layout from '@/components/@common/Layout/Layout.tsx';
import Title from '@components/@common/Title/Title.tsx';
import BackGroundCardStyles from '@components/@common/BackGroundCard/BackGroundCard.styles.ts';
import { useNavigate } from 'react-router-dom';
import CustomLink from '@components/@common/CustomLink/CustomLink.tsx';

const SignUp = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleButtonClick = () => {
    navigate('/sign-up/email'); // 이동할 경로 설정
  };
  return (
    <Layout>
      <BackGroundCardStyles>
        <Title>로그인하고 안전하게 투자연습을 시작해보세요!</Title>
        <Button
          type="button"
          text={'이메일로 가입'}
          onClick={handleButtonClick}
        />
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          이미 계정이 있으신가요?
          <CustomLink to="/login" text="로그인" />
        </div>
      </BackGroundCardStyles>
    </Layout>
  );
};

export default SignUp;
