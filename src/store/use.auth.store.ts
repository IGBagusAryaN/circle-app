import { create } from 'zustand';
import Cookies from 'js-cookie';

interface UserType {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: UserType | null;
  token: string | null;
  setUser: (user: UserType | null, token: string | null) => void;
  clearAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: Cookies.get('auth-store')
    ? JSON.parse(Cookies.get('auth-store') as string)
    : null,
  token: Cookies.get('token') ?? null,

  setUser: (userData, token) => {
    Cookies.set('auth-store', JSON.stringify(userData), { expires: 7 });
    Cookies.set('token', token ?? '', { expires: 7 });
    set({ user: userData, token });
  },

  clearAuth: () => {
    Cookies.remove('auth-store');
    Cookies.remove('token');
    set({ user: null, token: null });
  },

  logout: () => {
    Cookies.remove('auth-store');
    Cookies.remove('token');
    set({ user: null, token: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
}));
