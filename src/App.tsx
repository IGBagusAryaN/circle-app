import './App.css'
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



function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <div>
      <BrowserRouter>
         <Routes>
            <Route path="/login" element={< Login/>}/>
            <Route path="/register" element={< Register/>}/>
            <Route path="/forgotpassword" element={< ForgotPassword/>}/>
            <Route path="/resetpassword" element={< ResetPassword/>}/>

            <Route element={<PrivateRoute isAuthenticated={isAuthenticated === "true"}/>}>
              <Route path="/" element={< Home/>}/>
              <Route path="/comment/:id" element={< CommentPage/>}/>
              <Route path="/profile" element={< ProfilePage/>}/>
              <Route path="/search" element={< SearchPage/>}/>
              <Route path="/profile/:id" element={< ProfileUserPage/>}/>
              <Route path="/follows" element={< FollowsPage/>}/>
              <Route path="/image" element={< ImageGrid/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
   
  )
}

export default App
