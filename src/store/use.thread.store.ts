import { create } from 'zustand';
import Cookies from 'js-cookie';
import { getAllThreads } from 'features/dashboard/services/thread.service';
import { ThreadTypes } from 'types/threads.types';

interface ThreadStore {
  threads: ThreadTypes[];
  user: ThreadTypes['author'] | null;
  fetchThreads: () => Promise<void>;
}

const useThreadStore = create<ThreadStore>((set) => ({
  threads: [],
  user: null,
  fetchThreads: async () => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found');
      return;
    }
    try {
      const threadData = await getAllThreads(token);
      set({
        threads: threadData,
        user: threadData.length > 0 ? threadData[0].author : null,
      });
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  },
}));

export default useThreadStore;
