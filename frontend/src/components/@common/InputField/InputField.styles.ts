import styled from 'styled-components';

// 컨테이너
export const Container = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`;

// 공용 Label
export const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: #555;
`;

// 공용 Input
export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 15px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ccc')};
  border-radius: 4px;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? 'red' : '#007bff')};
    outline: none;
  }
`;

// 에러 메시지
export const ErrorMessage = styled.div`
  font-size: 0.75rem;
  color: red;
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
`;

// 에러 아이콘
export const ErrorIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 0.875rem;
`;
