import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Reset 기본값 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* HTML 기본값 설정 */
  html {
    font-size: 16px; /* 루트 폰트 크기, rem 단위 계산 기준 */
    scroll-behavior: smooth; /* 스크롤 애니메이션 부드럽게 */
  }

  /* Body 스타일 */
  body {
    font-family: Arial, sans-serif;
    background-color: #F5F5F5;
    color: #000000;
    line-height: 1.6; /* 텍스트 가독성을 위한 줄 간격 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
  }

  /* HTML5 요소 초기화 */
  article, aside, details, figcaption, figure, footer, header, main, menu, nav, section {
    display: block;
  }

  /* 링크 스타일 */
  a {
    color: inherit;
    text-decoration: none; /* 링크 밑줄 제거 */
    cursor: pointer;
  }

  /* 버튼 초기화 */
  button {
    font-family: inherit;
    border: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
