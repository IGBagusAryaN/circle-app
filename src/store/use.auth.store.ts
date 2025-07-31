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

// Fungsi untuk cek apakah token sudah expired
const isJwtExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now(); // JWT exp dalam detik, Date.now() dalam ms
  } catch (err) {
    return true; // kalau error saat parse, anggap expired
  }
};

export const useAuthStore = create<AuthState>((set) => {
  const rawUser = Cookies.get('auth-store');
  const token = Cookies.get('token') ?? null;

  const expired = isJwtExpired(token);

  if (expired) {
    Cookies.remove('auth-store');
    Cookies.remove('token');
    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      window.location.href = '/login'; // Redirect otomatis
    }
  }

  const parsedUser = !expired && rawUser ? JSON.parse(rawUser) : null;

  return {
    user: parsedUser,
    token: expired ? null : token,

    setUser: (userData, token) => {
      Cookies.set('auth-store', JSON.stringify(userData), { expires: 1 }); // optional: ganti ke 1 hari
      Cookies.set('token', token ?? '', { expires: 1 });
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
  };
});
