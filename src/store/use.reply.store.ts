import { create } from 'zustand';
import Cookies from 'js-cookie';
import { getReplies } from 'features/dashboard/services/reply.service';
import { replyTypes } from 'types/reply.types';

interface ReplyStore {
  replies: replyTypes[];
  user: replyTypes['author'] | null;
  error: string | null; // Menyimpan pesan error
  fetchReplies: (threadId: number) => Promise<void>;
  addReply: (newReply: replyTypes) => void;
  updateReply: (updatedReply: replyTypes) => void;
  deleteReply: (replyId: number) => void;
}

const useReplyStore = create<ReplyStore>((set) => ({
  replies: [],
  user: null,
  error: null,

  fetchReplies: async (threadId) => {
    const token = Cookies.get('token');
    if (!token) {
      set({ error: 'Token tidak ditemukan.' });
      return;
    }
    try {
      const replyData = await getReplies(threadId);
      if (!Array.isArray(replyData)) {
        set({ error: 'Format data tidak valid.', replies: [] });
        return;
      }
      set({ replies: replyData, user: replyData[0]?.author || null, error: null });
    } catch (error) {
      set({ error: 'Gagal memuat replies.', replies: [] });
    }
  },

  addReply: (newReply) =>
    set((state) => ({ replies: [newReply, ...state.replies], error: null })),

  updateReply: (updatedReply) =>
    set((state) => ({
      replies: state.replies.map((reply) =>
        reply.id === updatedReply.id ? updatedReply : reply
      ),
      error: null,
    })),

  deleteReply: (replyId) =>
    set((state) => ({
      replies: state.replies.filter((reply) => reply.id !== replyId),
      error: null,
    })),
}));

export default useReplyStore;
