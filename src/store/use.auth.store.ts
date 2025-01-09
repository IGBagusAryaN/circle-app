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
  // Inisialisasi user dari cookies
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null,
  setUser: (userData) => {
    if (userData && userData.id) {
      console.log('Setting user in cookies:', userData);
  
      Cookies.set('user', JSON.stringify(userData), {
        expires: 7,
        path: '/', // Agar cookies bisa diakses di semua route
        sameSite: 'Lax', // Cegah CSRF
        secure: window.location.protocol === 'https:', // Hanya secure jika di HTTPS
      });
  
      set({ user: userData });
    } else {
      console.error('Invalid user data:', userData);
    }
  },
  
  
  clearAuth: () => {
    console.log('Clearing user data');
    Cookies.remove('user'); // Hapus data dari cookies
    set({ user: null });
  },

  logout: () => {
    console.log('Logging out user');
    Cookies.remove('token');
    Cookies.remove('user');
    set({ user: null });

    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
}));
