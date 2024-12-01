// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/authComponent/Login';
import Register from './components/authComponent/Register';
import ForgotPassword from './components/authComponent/ForgotPassword';
import ResetPassword from './components/authComponent/ResetPassword';
import 'sweetalert2/dist/sweetalert2.min.css';
import PrivateRoute from './auth/PrivateRoute';
import Home from 'components/page/homePage/index';
import CommentPage from 'components/page/commentPage/CommentPage';
// import PopOver from 'components/button/PopOverEditProfile';
import ProfilePage from 'components/page/profilePage/ProfilePage';
import SearchPage from 'components/page/searchPage/SearchPage';
import ProfileUserPage from 'components/page/profilePage/ProfileUserPage';
// import PopoverCreatePost from 'components/button/PopOverCreatePost';


function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <div>
      <BrowserRouter>
         <Routes>
            <Route path="/login" element={< Login/>}/>
            {/* <Route path="/pop" element={< PopoverCreatePost/>}/> */}
            <Route path="/register" element={< Register/>}/>
            <Route path="/forgotpassword" element={< ForgotPassword/>}/>
            <Route path="/resetpassword" element={< ResetPassword/>}/>
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated === "true"}/>}>
              <Route path="/" element={< Home/>}/>
              <Route path="/comment/:id" element={< CommentPage/>}/>
              <Route path="/profile" element={< ProfilePage/>}/>
              <Route path="/search" element={< SearchPage/>}/>
              <Route path="/profile/:id" element={< ProfileUserPage/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
   
  )
}

export default App
