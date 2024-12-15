import React, { useState, useEffect } from 'react';
import { fetchMarketSummary } from '@/apis/stock'; // API 호출 함수 임포트
import Layout from '@/components/@common/Layout/Layout.tsx';
import {
  Hero,
  FeatureSection,
  GridContainer,
  IndexSection,
  IndexCard,
} from '@/pages/@common/Home/Home.styles.ts';

// MarketSummary 타입 정의
interface MarketSummary {
  id: number;
  name: string;
  value: string;
}

const Home: React.FC = () => {
  // API 데이터 저장용 상태값
  const [marketSummary, setMarketSummary] = useState<MarketSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태값
  const [error, setError] = useState<string | null>(null); // 에러 메시지

  // 컴포넌트 초기 렌더링 시 API 호출
  useEffect(() => {
    const loadMarketSummary = async () => {
      try {
        setLoading(true); // 로딩 시작
        const data = await fetchMarketSummary(); // API 호출
        setMarketSummary(data); // 데이터 상태 업데이트
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.'); // 에러 상태 업데이트
        console.error(err);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    loadMarketSummary(); // 비동기 함수 호출
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <Hero>
        <h1>모의 투자의 모든 것</h1>
        <p>쉽고 빠르게 투자 경험을 쌓아보세요.</p>
      </Hero>

      {/* 로딩 중 처리 */}
      {loading ? (
        <p>데이터를 불러오는 중...</p>
      ) : error ? (
        // 에러 발생 시 메시지 출력
        <p>{error}</p>
      ) : (
        <>
          {/* 실시간 주가 지수 */}
          <IndexSection>
            {marketSummary.map((item) => (
              <IndexCard key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.value}</p>
              </IndexCard>
            ))}
          </IndexSection>
        </>
      )}

      {/* API 데이터 외 섹션 */}
      <FeatureSection>
        <h2>투자 정보</h2>
        <GridContainer>
          <p>API 데이터 외 콘텐츠는 여전히 렌더링됩니다.</p>
        </GridContainer>
      </FeatureSection>
    </Layout>
  );
};

export default Home;
