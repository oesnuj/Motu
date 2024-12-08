import styled from 'styled-components';

// 토글 스위치 래퍼 스타일
export const ToggleWrapper = styled.div`
  display: flex;
  margin-left: auto; /* 강제로 오른쪽 정렬 */
  margin-bottom: 1rem;
  align-items: center;
  margin-right: 5.5rem;
`;

// 토글 라벨 스타일
export const ToggleLabel = styled.label<{ isOn: boolean }>`
  font-size: 13px; /* 글자 크기 줄이기 */
  font-weight: bold;
  margin-left: 0.5rem;
  color: ${(props) => (props.isOn ? '#1a73e8' : '#a9a9a9')}; /* 동적 색상 */
`;
