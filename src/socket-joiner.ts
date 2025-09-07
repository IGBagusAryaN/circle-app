// // components/SocketJoiner.tsx
// import { useEffect } from 'react';
// import { socket } from 'socket';

// import { useAuthStore } from 'store/use.auth.store';

// const SocketJoiner = () => {
//   const user = useAuthStore((state) => state.user);

//   useEffect(() => {
//     if (!user?.id) return;

//     const room = `user-${user.id}`;
//     console.log('📡 Emit joinRoom dari SocketJoiner:', room);
//     socket.emit('joinRoom', room);
//   }, [user?.id]);

//   useEffect(() => {
//   console.log('🔍 Current user in SocketJoiner:', user);
// }, [user]);


//   return null;
// };

// export default SocketJoiner;
