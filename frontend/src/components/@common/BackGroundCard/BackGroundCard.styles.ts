import styled from 'styled-components';

interface CardProps {
  bgColor?: string;
  maxWidth?: string;
  padding?: string;
  borderRadius?: string;
  height?: string;
}

const Card = styled.div<CardProps>`
  background-color: ${({ bgColor }) => bgColor || '#ffffff'};
  border-radius: ${({ borderRadius }) => borderRadius || '10px'};
  padding: ${({ padding }) => padding || '20px'};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || '900px'};
  height: ${({ height }) => height || 'auto'};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 15px;
    width: 90%;
  }
`;

export default Card;
