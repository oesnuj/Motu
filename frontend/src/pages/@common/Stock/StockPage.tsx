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

const StocksPage: React.FC = () => {
  const [stocks, setStocks] = useState<any[]>([]);

  useEffect(() => {
    fetchStocks().then(setStocks);
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
