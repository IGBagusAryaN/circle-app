import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,

      setUser: (userData) => {
        console.log('setUser called with:', userData);

        if (!userData || !userData.id) {
          console.error('Invalid user data: ID is missing', userData);
          return;
        }

        set({ user: userData });
        console.log('User data set in store:', userData);
      },

      clearAuth: () => {
        console.log('Clearing user data');
        set({ user: null });
      },

      logout: () => {
        console.log('Logging out user');
        Cookies.remove('token');
        set({ user: null });

        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      },
    }),
    {
      name: 'auth-store',
    }
  )
);
