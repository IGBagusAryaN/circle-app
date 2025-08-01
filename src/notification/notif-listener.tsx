import { useEffect } from 'react';
import { socket } from '../socket';
import { useNotificationStore } from './notif-store';


interface IncomingNotification {
  id: number;
  type: 'like' | 'comment';
  message: string;
  threadId?: number;
  username: string;
  avatarUrl?: string;
  createdAt: number; // ini otomatis
}


const NotificationListener = () => {
  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    // console.log('📡 NotificationListener mounted');

    const handleNotification = (data: IncomingNotification) => {
      console.log('🔥 Notification received:', data);
      if (!data.message || !data.type) return;


  useNotificationStore.getState().addNotification({
    id: data.id,
    type: data.type,
    message: data.message,
    threadId: data.threadId,
    username: data.username,
    avatarUrl: data.avatarUrl ?? '', // optional
  });
    };

    socket.on('newNotification', handleNotification);

    return () => {
      socket.off('newNotification', handleNotification);
    };
  }, [addNotification]);

  
  return null;
};

export default NotificationListener;
