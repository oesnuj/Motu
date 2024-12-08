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
    <>
      {label && <Styled.Label>{label}</Styled.Label>}
      <Styled.Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <Styled.ErrorMessage>{error}</Styled.ErrorMessage>}
    </>
  );
};

export default InputField;
