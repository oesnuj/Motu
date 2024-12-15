import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 80px 40px 40px;
  background: #f8f9fa;
  text-align: center;
`;

export const SummarySection = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  div {
    text-align: center;

    h2 {
      margin-bottom: 10px;
      color: #333;
    }

    p {
      font-size: 1.2rem;
      font-weight: bold;
      color: #555;
    }
  }
`;

export const PortfolioList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const PortfolioCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;

  h2 {
    margin-bottom: 10px;
    color: #333;
  }

  p {
    color: #555;
  }
`;

export const ValueHighlight = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #2a9d8f;
`;
