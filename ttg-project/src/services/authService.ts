import { api, setToken } from '@/lib/api';

interface LoginRequest {
  userEmail: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>('/auth/login', data);
  setToken(res.accessToken);
  return res;
}
