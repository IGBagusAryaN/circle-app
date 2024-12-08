import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FollowState {
  following: number[];
  toggleFollow: (userId: number) => void;
}

export const UseFollowStore = create<FollowState>()(
  persist(
    (set, get) => ({
      following: [], // State awal berupa array kosong
      toggleFollow: (userId) => {
        const { following } = get(); // Ambil state saat ini
        set({
          following: following.includes(userId)
            ? following.filter((id) => id !== userId) // Jika userId ada, hapus
            : [...following, userId], // Jika tidak ada, tambahkan
        });
      },
    }),
    { name: "follow-store"} // Tentukan penyimpanan pada localStorage
  )
);
