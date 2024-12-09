import styled from 'styled-components';

// 공용 Label
export const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: #555;
`;

// 공용 Input
export const Input = styled.input`
  width: 80%;
  padding: 15px;
  margin-bottom: 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
// 에러 메시지
export const ErrorMessage = styled.div`
  color: red;
`;
