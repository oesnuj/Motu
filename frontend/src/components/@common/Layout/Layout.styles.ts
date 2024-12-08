import styled from 'styled-components';

// 전체 Layout 스타일
export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 화면 전체 높이를 차지 */
  background-color: #f7f7f7; /* 페이지 배경색 */
`;

// Main 콘텐츠 스타일
export const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px 20px;
  box-sizing: border-box;
`;
