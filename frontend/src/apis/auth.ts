// API 기본 URL 가져오기 (환경 변수 활용)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 환경 변수 확인 (정의되지 않은 경우 예외 발생)
if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined');
}

// 로그인 요청 파라미터 타입 정의
interface LoginProps {
  email: string; // 사용자 이메일
  password: string; // 사용자 비밀번호
}

/**
 * 로그인 함수
 * @param {LoginProps} - 로그인 요청에 필요한 이메일과 비밀번호
 * @returns {Promise<Response>} - 서버 응답 객체 반환
 */
export const login = async ({ email, password }: LoginProps) => {
  try {
    // 로그인 API 호출
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 요청 헤더 설정
      },
      credentials: 'include', // 쿠키 전달 설정 (세션 관리용)
      body: JSON.stringify({ email, password }), // 요청 바디
    });

    // 응답 상태 코드 확인
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`); // HTTP 에러 처리
    }

    const data = await response.json(); // 응답 데이터 파싱

    console.log('Login successful:', data); // 성공 로그
    alert('Login successful!'); // 알림 메시지 (선택)
    return response; // 응답 객체 반환
  } catch (error) {
    console.error('Login error:', error); // 에러 로그
    throw error; // 에러 재발생
  }
};

// 회원가입 요청 파라미터 타입 정의
interface SignUpProps {
  username: string; // 사용자 이름
  email: string; // 사용자 이메일
  password: string; // 사용자 비밀번호
}

/**
 * 회원가입 함수
 * @param {SignUpProps} - 회원가입 요청에 필요한 사용자 이름, 이메일, 비밀번호
 * @returns {Promise<Response>} - 서버 응답 객체 반환
 */
export const signUp = async ({ username, email, password }: SignUpProps) => {
  try {
    // 회원가입 API 호출
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 요청 헤더 설정
      },
      credentials: 'include', // 쿠키 전달 설정 (세션 관리용)
      body: JSON.stringify({ username, email, password }), // 요청 바디
    });

    // 응답 상태 코드 확인
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`); // HTTP 에러 처리
    }

    const data = await response.json(); // 응답 데이터 파싱

    console.log('Sign-up successful:', data); // 성공 로그
    alert('Sign-up successful!'); // 알림 메시지 (선택)
    return response; // 응답 객체 반환
  } catch (error) {
    console.error('Sign-up error:', error); // 에러 로그
    throw error; // 에러 재발생
  }
};
