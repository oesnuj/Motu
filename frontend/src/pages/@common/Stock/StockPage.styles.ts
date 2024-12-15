import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 80px 40px 40px;
  background: #f8f9fa;
  text-align: center;
`;

export const StockList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const StockCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;

  h2 {
    margin-bottom: 10px;
  }

  p {
    color: #555;
  }
`;

export const PriceChange = styled.p<{ isPositive: boolean }>`
  color: ${(props) =>
    props.isPositive ? '#E63946' : '#1D3557'}; /* 빨강 or 파랑 */
  font-weight: bold;
`;

export const Button = styled.button`
  margin: 10px 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ChartPlaceholder = styled.div`
  height: 150px;
  background: #e9ecef;
  margin-top: 10px;
  border-radius: 8px;
  line-height: 150px;
  color: #888;
`;
