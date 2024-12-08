interface LoginProps {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginProps) => {
  try {
    const response = await fetch(
      'https://port-0-motu-m3u4da1s4325e11d.sel4.cloudtype.app/auth/login',
      {
        method: 'POST', // 요청 메서드 추가
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }), // 데이터를 JSON 형식으로 변환
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error; // 호출부에서 에러 처리 가능하도록 다시 던짐
  }
};

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

export const signUp = async ({ username, email, password }: SignUpProps) => {
  try {
    const response = await fetch(
      'https://port-0-motu-m3u4da1s4325e11d.sel4.cloudtype.app/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), // 데이터를 JSON 형식으로 변환
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Sign-up error:', error);
    throw error;
  }
};
