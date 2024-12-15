import React from 'react';
import * as Styled from '@/components/@common/InputField/InputField.styles.ts';

interface InputFieldProps {
  label?: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}: InputFieldProps) => {
  return (
    <Styled.Container>
      {label && <Styled.Label>{label}</Styled.Label>}
      <Styled.Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        hasError={!!error} // 에러 여부에 따라 스타일 변경
      />
      {error && (
        <Styled.ErrorMessage>
          <Styled.ErrorIcon>⚠</Styled.ErrorIcon>
          {error}
        </Styled.ErrorMessage>
      )}
    </Styled.Container>
  );
};

export default InputField;
