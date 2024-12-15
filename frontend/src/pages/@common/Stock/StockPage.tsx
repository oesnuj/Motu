import React, { useEffect, useState } from 'react';
import { fetchStocks } from '@/apis/stock';
import {
  PageContainer,
  StockCard,
  StockList,
  Button,
  ChartPlaceholder,
  PriceChange,
} from '@pages/@common/Stock/StockPage.styles.ts';

// 주식 데이터 타입 재사용
type Stock = {
  id: number;
  name: string;
  price: number;
  change: string;
};

const StocksPage: React.FC = () => {
  // useState에 명시적으로 Stock[] 타입 지정
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    fetchStocks()
      .then(setStocks)
      .catch((error) => {
        console.error('Error fetching stocks:', error);
      });
  }, []);

  return (
    <PageContainer>
      <h1>주식 골라보기</h1>
      <StockList>
        {stocks.map((stock) => (
          <StockCard key={stock.id}>
            <h2>{stock.name}</h2>
            <p>가격: ${stock.price}</p>
            <PriceChange isPositive={stock.change.startsWith('+')}>
              변동: {stock.change}
            </PriceChange>
            <Button>매수</Button>
            <Button>매도</Button>
            <ChartPlaceholder>차트 영역</ChartPlaceholder>
          </StockCard>
        ))}
      </StockList>
    </PageContainer>
  );
};

export default StocksPage;
