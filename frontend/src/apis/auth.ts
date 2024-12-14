const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined');
}

interface LoginProps {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginProps) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // 로그인 성공 로그
    console.log('Login successful:', data);
    alert('Login successful!'); // 알림 메시지 추가 (선택)
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

export const signUp = async ({ username, email, password }: SignUpProps) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Sign-up successful:', data);
    alert('Sign-up successful!'); // 알림 메시지 추가 (선택)

    return response;
  } catch (error) {
    console.error('Sign-up error:', error);
    throw error;
  }
};
