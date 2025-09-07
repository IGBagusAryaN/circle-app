import './App.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/authPage/Login';
import Register from './components/authPage/Register';
import ForgotPassword from './components/authPage/ForgotPassword';
import ResetPassword from './components/authPage/ResetPassword';
import PrivateRoute from './auth/PrivateRoute';
import Home from 'components/page/homePage/HomePage';
import CommentPage from 'components/page/commentPage/CommentPage';
import ProfilePage from 'components/page/profilePage/ProfilePage';
import SearchPage from 'components/page/searchPage/SearchPage';
import ProfileUserPage from 'components/page/profilePage/ProfileUserPage';
import FollowsPage from 'components/page/followsPage/FollowsPage';
import ImageGrid from 'components/page/ImagePage';
import SetProfile from 'components/authPage/SetProfile';
import ProfilePagetest from 'features/auth/tests/testt';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from 'store/use.auth.store';
// import { useEffect } from 'react';
// import { socket } from 'socket';
// import NotificationListener from 'notification/notif-listener';
// import SocketJoiner from 'socket-joiner';

function App() {
  // const user = useAuthStore((state) => state.user);
// useEffect(() => {
//   const userId = user?.id;
//   if (!userId) return;

//   const handleConnect = () => {
//     const room = `user-${userId}`;
//     console.log('📡 Emit joinRoom dari App:', room);
//     socket.emit('joinRoom', room);
//   };

//   socket.on('connect', handleConnect);

//   // 🔁 Kalau socket udah connect sebelum effect jalan (sangat mungkin), trigger manual
//   if (socket.connected) {
//     handleConnect();
//   }

//   return () => {
//     socket.off('connect', handleConnect);
//   };
// }, [user]);


  return (
    <div>
      <BrowserRouter>
       {/* <NotificationListener/> */}
       {/* <SocketJoiner/> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setprofile" element={<SetProfile />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/comment/:id" element={<CommentPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile/:userId" element={<ProfileUserPage />} />
            <Route path="/follows" element={<FollowsPage />} />
            <Route path="/image/:id" element={<ImageGrid />} />
            <Route path="/test" element={<ProfilePagetest />} />
            <Route path="/thread/:id" element={<CommentPage />} />
          </Route>
        </Routes>
        <Toaster
          toastOptions={{
            className: '',
            style: {
              padding: '16px',
              background: '#1D1D1D',
              color: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
              // border: '2px solid #555', // Subtle border
            },
          }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
