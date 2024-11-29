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
import Home from './components/home/index';
import PrivateRoute from './auth/PrivateRoute';


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
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
   
  )
}

export default App
