import { create } from 'zustand';
import Cookies from 'js-cookie';

interface UserType {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  clearAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: Cookies.get('auth-store')
    ? JSON.parse(Cookies.get('auth-store') as string)
    : null,
  setUser: (userData) => {
    Cookies.set('auth-store', JSON.stringify(userData), { expires: 7 });
    set({ user: userData });
  },
  clearAuth: () => {
    Cookies.remove('auth-store');
    set({ user: null });
  },
  logout: () => {
    Cookies.remove('auth-store');
    Cookies.remove('token');
    set({ user: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
}));
