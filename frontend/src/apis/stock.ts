// 마켓 요약 정보 가져오기
export const fetchMarketSummary = async (): Promise<any> => {
  try {
    const response = await fetch('/api/stocks/home', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error fetching market summary: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching market summary:', error);
    throw error;
  }
};

// 주식 목록 가져오기
export const fetchStocks = async (): Promise<
  { id: number; name: string; price: number; change: string }[]
> => {
  try {
    const response = await fetch('/api/stocks', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error fetching stocks: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
};

// 거래 처리
export const processTrade = async (data: {
  userId: number;
  stockId: number;
  type: string;
  quantity: number;
}): Promise<any> => {
  try {
    const response = await fetch('/api/stocks/trade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error processing trade: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing trade:', error);
    throw error;
  }
};

// 사용자 포트폴리오 가져오기
export const fetchPortfolio = async (
  userId: number,
): Promise<
  {
    id: number;
    stock: string;
    quantity: number;
    value: string;
    avgPrice: string;
    profit: string;
  }[]
> => {
  try {
    const response = await fetch(`/api/stocks/portfolio/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error fetching portfolio: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    throw error;
  }
};
