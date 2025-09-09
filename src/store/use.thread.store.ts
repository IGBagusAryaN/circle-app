import { create } from 'zustand';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getAllThreads, updateThread, deleteThread } from 'features/dashboard/services/thread.service';
import { ThreadTypes } from 'types/threads.types';
import { apiURL } from 'utils/baseurl';

interface ThreadStore {
  threads: ThreadTypes[];
  user: ThreadTypes['author'] | null;
  error: string | null;
  loading: boolean;
  fetchThreads: () => Promise<void>;
  addThread: (newThread: ThreadTypes) => void;
  updateThreadContent: (threadId: number, content: string, image: File | null) => Promise<void>;
  deleteThreadById: (threadId: number) => Promise<void>;
  postThread: (content: string, file: File | null) => Promise<void>;
}

const useThreadStore = create<ThreadStore>((set) => ({
  threads: [],
  user: null,
  error: null,
  loading: false,

  fetchThreads: async () => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    set({ loading: true });

    try {
      const threadData = await getAllThreads(token);

      if (!Array.isArray(threadData)) {
        console.error('Invalid data format:', threadData);
        set({ threads: [], loading: false });
        return;1
      }

      set({
        threads: threadData,
        user: threadData.length > 0 ? threadData[0].author : null,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching threads:', error);
      set({ threads: [], loading: false });
    }
  },

  addThread: (newThread) =>
    set((state) => ({ threads: [newThread, ...state.threads], error: null })),

  updateThreadContent: async (threadId, content, image) => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const updatedThread = await updateThread(threadId, formData);

      set((state) => ({
        threads: state.threads.map((thread) =>
          thread.id === threadId ? updatedThread : thread
        ),
      }));

      Swal.fire({
        title: 'Success!',
        text: 'Thread updated successfully.',
        icon: 'success',
        confirmButtonColor: '#04A51E',
        background: '#1D1D1D',
        color: '#fff',
      });
    } catch (error) {
      console.error('Error updating thread:', error);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to update the thread. Please try again.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
      });
    }
  },

  deleteThreadById: async (threadId) => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'This thread will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#4A5568',
      confirmButtonText: 'Yes, delete it!',
      background: '#1D1D1D',
      color: '#fff',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteThread(threadId);

          set((state) => ({
            threads: state.threads.filter((thread) => thread.id !== threadId),
          }));

          Swal.fire({
            title: 'Deleted!',
            text: 'Your thread has been deleted.',
            icon: 'success',
            background: '#1D1D1D',
            color: '#fff',
            confirmButtonColor: '#04A51E',
          });
        } catch (error) {
          console.error('Error deleting thread:', error);

          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete the thread. Please try again.',
            icon: 'error',
            background: '#1D1D1D',
            color: '#fff',
            confirmButtonColor: '#4A5568',
          });
        }
      }
    });
  },

  postThread: async (content, file) => {
    if (!content.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'Konten tidak boleh kosong.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
      });
      return;
    }

    set({ loading: true });

    const formData = new FormData();
    formData.append('content', content);
    if (file) {
      formData.append('image', file);
    }

    const token = Cookies.get('token');
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Pengguna tidak terautentikasi.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
      });
      set({ loading: false });
      return;
    }

    try {
      const response = await axios.post(`${apiURL}/thread`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const threadData = response.data.thread;

      const newThread: ThreadTypes = {
        id: threadData.id,
        content: threadData.content,
        createdAt: new Date(threadData.createdAt),
        updateAt: new Date(threadData.updatedAt),
        userId: threadData.userId || 0,
        authorId: threadData.authorId || 0,
        image: threadData.image || '',
        profile: threadData.profile,
        author: threadData.author,
      };
  

      set((state) => ({ threads: [newThread, ...state.threads] }));

      Swal.fire({
        title: 'Success!',
        text: 'Thread berhasil diposting.',
        icon: 'success',
        confirmButtonColor: '#04A51E',
        background: '#1D1D1D',
        color: '#fff',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Gagal memposting thread.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
      });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useThreadStore;
