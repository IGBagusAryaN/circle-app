import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Account {
  id: string;
  fullName: string;
  email: string;
  profileImage: string;
  bannerImage: string;
  username: string;
  bio: string;
  following: number;
  followers: number;
}

interface AccountData {
  [accountId: string]: {
    preferences?: { theme: string; language: string };
    otherData?: any;
    profileImage?: string;
    bannerImage?: string;
    fullName?: string;
    username?: string;
    bio?: string;
    following?: number;
    followers?: number;
  };
}

interface AccountStore {
  account: Account | null;
  accountData: AccountData;
  login: (account: Account) => void;
  logout: () => void;
  updateAccountData: (data: Partial<AccountData[string]>) => void;
}

const UseAccountStore = create<AccountStore>()(
  persist(
    (set, get) => ({
      account: null,
      accountData: {},

      // Fungsi login untuk menyimpan akun aktif
      login: (account) => {
        set((state) => {
          const existingData = state.accountData[account.id] || {}; // Ambil data yang sudah ada di accountData
          const mergedAccount = { ...account, ...existingData }; // Gabungkan data account baru dengan data yang tersimpan
      
          return {
            account: mergedAccount,
            accountData: {
              ...state.accountData,
              [account.id]: existingData, // Pastikan data accountData tetap ada
            },
          };
        });
      },
      
      // Fungsi logout untuk menghapus akun aktif
      logout: () => set({ account: null }),

      // Fungsi untuk memperbarui data akun
      updateAccountData: (data) => {
        const currentAccount = get().account;
        if (!currentAccount) return;
      
        set((state) => {
          const accountData = { ...state.accountData };
          accountData[currentAccount.id] = {
            ...accountData[currentAccount.id],
            ...data,
          };
      
          // Perbarui juga data account untuk sinkronisasi langsung di UI
          const updatedAccount = {
            ...currentAccount,
            ...accountData[currentAccount.id],
          };
      
          console.log("Updated Account Data:", accountData);
          return { accountData, account: updatedAccount };
        });
      },
      
    }),
    {
      name: "account-store", // Nama key untuk localStorage
      partialize: (state) => ({
        account: state.account, // Hanya simpan akun aktif
        accountData: state.accountData, // Simpan data akun
      }),
    }
  )
);

export default UseAccountStore;
