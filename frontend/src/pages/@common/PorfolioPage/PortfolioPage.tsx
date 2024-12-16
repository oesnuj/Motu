import React, { useEffect, useState } from 'react';
import { fetchPortfolio } from '@/apis/stock';
import {
  PageContainer,
  PortfolioList,
  PortfolioCard,
  ValueHighlight,
  SummarySection,
} from './PortfolioPage.styles';
import { Pie } from 'react-chartjs-2';

// Chart.js 요소 등록
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

// 타입 정의
interface PortfolioItem {
  id: number;
  stock: string;
  quantity: number;
  value: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

const PortfolioPage: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);

  useEffect(() => {
    fetchPortfolio(1)
      .then((data) => {
        setPortfolio(data);

        // 데이터 가공
        const labels = data.map((item) => item.stock);
        const values = data.map((item) =>
          parseFloat(item.value.replace(/[$,]/g, '')),
        );

        // 전체 보유 금액 계산
        const total = values.reduce((acc, curr) => acc + curr, 0);

        // 수익률 계산 (가정: 수익/손실 값이 item.value에 포함되지 않으므로 여기서 수익률 로직 조정)
        const totalProfit = data.reduce((acc, item) => {
          const value = parseFloat(item.value.replace(/[$,]/g, ''));
          const avgPurchasePrice = value * 0.95; // 예시: 평균 구매가를 현재 가치의 95%로 가정
          return acc + (value - avgPurchasePrice);
        }, 0);

        setChartData({
          labels,
          datasets: [
            {
              label: '포트폴리오 가치',
              data: values,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
          ],
        });

        setTotalValue(total);
        setTotalProfit(totalProfit);
      })
      .catch((err) => {
        console.error(err);
        setError('데이터를 불러오지 못했습니다.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageContainer>로딩 중...</PageContainer>;
  if (error) return <PageContainer>{error}</PageContainer>;

  return (
    <PageContainer>
      <h1>포트폴리오</h1>
      <SummarySection>
        <div>
          <h2>총 보유 금액</h2>
          <p>${totalValue.toFixed(2)}</p>
        </div>
        <div>
          <h2>총 수익</h2>
          <p style={{ color: totalProfit >= 0 ? 'green' : 'red' }}>
            ${totalProfit.toFixed(2)}
          </p>
        </div>
        <div>
          <h2>수익률</h2>
          <p style={{ color: totalProfit >= 0 ? 'green' : 'red' }}>
            {((totalProfit / totalValue) * 100).toFixed(2)}%
          </p>
        </div>
      </SummarySection>

      {chartData && (
        <div style={{ width: '400px', margin: '0 auto 40px' }}>
          <Pie data={chartData} />
        </div>
      )}
      <PortfolioList>
        {portfolio.map((item) => (
          <PortfolioCard key={item.id}>
            <h2>{item.stock}</h2>
            <p>수량: {item.quantity}</p>
            <ValueHighlight>{item.value}</ValueHighlight>
          </PortfolioCard>
        ))}
      </PortfolioList>
    </PageContainer>
  );
};

export default PortfolioPage;
