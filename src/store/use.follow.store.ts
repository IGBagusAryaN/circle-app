import {
  getFollowers,
  getFollowing,
} from 'features/dashboard/services/follow.service';
import { create } from 'zustand';

interface FollowState {
  following: [];
  followers: [];
  fetchFollowing: (userId: number) => Promise<void>;
  fetchFollowers: (userId: number) => Promise<void>;
}

export const useFollowStore = create<FollowState>((set) => ({
  following: [],
  followers: [],
  fetchFollowing: async (userId: number) => {
    try {
      const data = await getFollowing(userId);
      set({ following: data });
    } catch (error) {
      console.error('Error fetching following:', error);
    }
  },
  fetchFollowers: async (userId: number) => {
    try {
      const data = await getFollowers(userId);
      set({ followers: data });
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
  },
}));
