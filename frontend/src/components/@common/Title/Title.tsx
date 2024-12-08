import React, { ReactNode } from 'react';
import styled from 'styled-components';

export const StyledTitle = styled.h2`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 4rem;
  max-width: 80%;
`;

interface TitleProps {
  children: ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default Title;
