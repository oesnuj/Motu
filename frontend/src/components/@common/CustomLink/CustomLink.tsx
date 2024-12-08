import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 스타일 정의
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-size: 0.9rem;
  margin: 0 0.5rem;

  &:hover {
    text-decoration: underline;
    color: #0056b3;
  }

  &:active {
    color: #003f7f;
  }
`;

// 링크 컴포넌트
const CustomLink = ({ to, text }: { to: string; text: string }) => {
  return <StyledLink to={to}>{text}</StyledLink>;
};

export default CustomLink;
