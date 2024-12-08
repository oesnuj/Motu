import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;
  border-bottom: 2px solid #ffffff;
  padding: 0 2rem;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 16px;
  align-items: center;
  line-height: 1;
  a,
  span {
    cursor: pointer;
    font-size: 15px;
    text-decoration: none;

    &:hover {
      font-weight: bold;
    }
  }
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LogoImage = styled.img`
  width: 40px; /* 로고 이미지 크기 */
  height: 40px;
`;

export const LogoText = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

export const SessionTime = styled.p`
  font-size: 15px;
`;
