import React from 'react';
import * as Styled from '@/components/@common/Button/Button.styles.ts';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button' }) => {
  return (
    <Styled.Button type={type} onClick={onClick}>
      {text}
    </Styled.Button>
  );
};

export default Button;
