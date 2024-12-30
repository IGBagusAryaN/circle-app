import { UserTypes } from 'types/users.types';
import { create } from 'zustand';

interface AccountState {
  user: UserTypes | null;
  setUser: (user: UserTypes | null) => void;
}

const useAccountStore = create<AccountState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useAccountStore;
