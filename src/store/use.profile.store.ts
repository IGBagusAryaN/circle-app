import { create } from 'zustand';
import Cookies from 'js-cookie';
import { getAllUsers } from 'features/dashboard/services/users.service';
import { UserTypes } from 'types/users.types';

type ProfileState = {
  profile: UserTypes | null;
  retrieveUserProfile: () => Promise<void>;
};

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,

  retrieveUserProfile: async () => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const decoded: { id: number } = JSON.parse(atob(token.split('.')[1]));
      const allUsers = await getAllUsers(token);
      const loggedInUser = allUsers.find((u: UserTypes) => u.id === decoded.id);
      if (loggedInUser) {
        set({ profile: loggedInUser });
      }
    } catch (error) {
      console.error('Error in retrieveUserProfile:', error);
    }
  },
}));
