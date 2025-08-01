import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Notification {
  id: number;
  type: 'like' | 'comment';
  message: string;
  threadId?: number;
  username: string;
  avatarUrl?: string;
  createdAt: number;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notif: Omit<Notification, 'createdAt'>) => void;
  clearNotifications: () => void;
}

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      addNotification: (notif) => {
        const newNotif: Notification = {
          ...notif,
          createdAt: Date.now(),
        };

        const validNotifs = get().notifications.filter(
          (n) => Date.now() - n.createdAt < THREE_DAYS_MS
        );

        set({
          notifications: [newNotif, ...validNotifs],
        });
      },
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'notification-storage',
      onRehydrateStorage: () => {
        return (state) => {
          const now = Date.now();
          const filtered =
            state?.notifications.filter((n) => now - n.createdAt < THREE_DAYS_MS) ?? [];

          setTimeout(() => {
            useNotificationStore.setState({ notifications: filtered });
          }, 0);
        };
      },
    }
  )
);
