import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
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

// Custom cookie storage
const cookieStorage: PersistStorage<AuthState> = {
  getItem: async (key) => {
    const cookieValue = Cookies.get(key);
    console.log(`[cookieStorage.getItem] Key: ${key}, Value: ${cookieValue}`);
    // Pastikan nilai dikembalikan sesuai dengan tipe StorageValue<AuthState>
    return cookieValue
      ? { state: JSON.parse(cookieValue) as AuthState }
      : null;
  },
  setItem: async (key, value) => {
    console.log(`[cookieStorage.setItem] Key: ${key}, Value: ${value}`);
    Cookies.set(key, JSON.stringify(value.state), { expires: 7 }); // Simpan state ke dalam cookie
  },
  removeItem: async (key) => {
    console.log(`[cookieStorage.removeItem] Key: ${key}`);
    Cookies.remove(key); // Hapus cookie
  },
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      setUser: (userData) => {
        console.log('[setUser] Setting user:', userData);
        set({ user: userData });
      },
      clearAuth: () => {
        console.log('[clearAuth] Clearing auth');
        set({ user: null });
      },
      logout: () => {
        console.log('[logout] Logging out');
        Cookies.remove('auth-store');
        set({ user: null });

        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      },
    }),
    {
      name: 'auth-store', // Key untuk cookies
      storage: cookieStorage, // Gunakan custom cookieStorage
    }
  )
);
