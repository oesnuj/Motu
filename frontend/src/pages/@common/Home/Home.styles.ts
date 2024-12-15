import styled from 'styled-components';

export const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #e6f0ff, white);
  padding: 80px 20px;
  text-align: center;

  h1 {
    font-size: 3.2rem;
    color: #333;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 30px;
  }
`;

export const FeatureSection = styled.section`
  padding: 40px 20px;
  background: #f5f6f8;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #333;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FeatureCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    font-size: 1.5rem;
    color: #0073e6;
    margin-bottom: 10px;
  }

  p,
  ul {
    color: #555;
    font-size: 1rem;
    margin: 0;
  }
`;

export const IndexSection = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  background: #f8f9fa;
`;

export const IndexCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

/* 추가된 스타일 */
export const StockList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

export const StockCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 1rem;
    margin-bottom: 5px;
  }
`;

export const PriceChange = styled.span<{ isPositive: boolean }>`
  font-weight: bold;
  color: ${(props) => (props.isPositive ? '#28a745' : '#dc3545')};
`;

export const NewsSection = styled.section`
  padding: 40px 20px;
  background: #fff;

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

export const NewsCard = styled.div`
  background: #f5f6f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  p {
    color: #555;
    font-size: 1rem;
  }
`;
