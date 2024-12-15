import React from 'react';
import Layout from '@/components/@common/Layout/Layout.tsx';
import {
  Hero,
  IndexSection,
  IndexCard,
  FeatureSection,
  StockCard,
  StockList,
  PriceChange,
} from '@/pages/@common/Home/Home.styles.ts';

// 주요 지수 타입
interface IndexSummary {
  id: number;
  name: string;
  value: string;
  change: string;
}

// 주식 데이터 타입
interface StockSummary {
  id: number;
  name: string;
  price: string;
  change: string;
}

// 더미 데이터: 주요 지수
const dummyIndexes: IndexSummary[] = [
  { id: 1, name: '나스닥', value: '19,024.72', change: '-23.88 (-0.1%)' },
  { id: 2, name: 'S&P 500', value: '6,051.00', change: '+0.16 (+0.03%)' },
  { id: 3, name: '코스피', value: '2,984.40', change: '-112.84 (-0.43%)' },
];

// 더미 데이터: 인기 주식
const dummyStocks: StockSummary[] = [
  { id: 1, name: 'AAPL (Apple)', price: '$170.45', change: '-1.17%' },
  { id: 2, name: 'GOOGL (Alphabet)', price: '$2803.71', change: '+0.52%' },
  { id: 3, name: 'AMZN (Amazon)', price: '$3450.98', change: '-0.16%' },
  { id: 4, name: 'MSFT (Microsoft)', price: '$299.12', change: '+0.32%' },
  { id: 5, name: 'TSLA (Tesla)', price: '$700.15', change: '+1.24%' },
];

const Home: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <Hero>
        <h1>모의 투자의 모든 것</h1>
        <p>쉽고 빠르게 투자 경험을 쌓아보세요.</p>
      </Hero>

      {/* 주요 지수 섹션 */}
      <IndexSection>
        {dummyIndexes.map((index) => (
          <IndexCard key={index.id}>
            <h3>{index.name}</h3>
            <p>{index.value}</p>
            <PriceChange isPositive={index.change.includes('+')}>
              {index.change}
            </PriceChange>
          </IndexCard>
        ))}
      </IndexSection>

      {/* 인기 주식 섹션 */}
      <FeatureSection>
        <h2>인기 주식 순위</h2>
        <StockList>
          {dummyStocks.map((stock) => (
            <StockCard key={stock.id}>
              <h3>{stock.name}</h3>
              <p>가격: {stock.price}</p>
              <PriceChange isPositive={stock.change.includes('+')}>
                변동률: {stock.change}
              </PriceChange>
            </StockCard>
          ))}
        </StockList>
      </FeatureSection>
    </Layout>
  );
};

export default Home;
