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
import { useAuthStore } from 'store/use.auth.store';
import ProfilePagetest from 'features/auth/tests/testt';
import { Toaster } from 'react-hot-toast';

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setprofile" element={<SetProfile />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          <Route element={<PrivateRoute user={user} />}>
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
      background: '#1D1D1D', // Background dark
      color: '#fff', // Text color white
      borderRadius: '8px', // Rounded corners
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // Soft shadow
      // border: '2px solid #555', // Subtle border
    },
  }}
/>

      </BrowserRouter>
    </div>
  );
}

export default App;
