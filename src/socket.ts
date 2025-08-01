import io from 'socket.io-client';
import { useAuthStore } from 'store/use.auth.store';

export const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('✅ Connected with ID:', socket.id);
  const userId = useAuthStore.getState().user?.id;
  console.log('🧾 Current userId:', userId);

  if (userId) {
    const room = `user-${userId}`;
    console.log('📡 Emit joinRoom dengan:', room);
    socket.emit('joinRoom', room);
  }
});


