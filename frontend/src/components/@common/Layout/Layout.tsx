import { ReactNode } from 'react';
import Header from '@/components/@common/Header/Header.tsx'; // 이미 구현된 Header 컴포넌트 사용
import * as Styled from '@/components/@common/Layout/Layout.styles.ts';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Styled.LayoutWrapper>
      <Header />
      <Styled.MainContent>{children}</Styled.MainContent>
    </Styled.LayoutWrapper>
  );
};

export default Layout;
