import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/user/Login'
import User from './pages/User'
import Tour from './pages/Tour';
import Booking from './pages/Booking'
import CreateToure from './pages/CreateToure';
import BookingDone from './pages/BookingDone';
import Dashboard from './pages/Dashboard';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'
const token = localStorage.getItem('token')
function App() {
  const [userRole , setUserRole] = useState(null)
  useEffect(()=>{
    if(token){
      const decode = jwtDecode(token)
      fetchUser(decode)
    }
    else{
      setUserRole('guest')
    }
  },[])
  const fetchUser = (decode)=>{
    if(decode.role === 'admin'){
      setUserRole('admin')
    }else{
      setUserRole('user')
    }
  }
  console.log(userRole)
  return (
    <BrowserRouter>
    <>
    <Routes>
      {userRole === 'admin' ? (
        <Route path='/dashboard' element={<Dashboard/>} />
    ): userRole === 'user' ?(
      <Route path="/" exact element={<Home/>} />
    ): (
      <Route path="/" exact element={<Home/>} />
    )}
    <Route path="/login" element={<Login/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/tour" element={<Tour/>} />
    <Route path="/user" element={<User/>} />
    <Route path="/booking/:id" element={<Booking/>} />
    <Route path='/createtoure' element={<CreateToure/>}/>
    <Route path='/bookingdone' element={<BookingDone/>}/>
    <Route path="/" element={<Home/>} />
    </Routes>
    </>
    </BrowserRouter>
  );
}

export default App;
