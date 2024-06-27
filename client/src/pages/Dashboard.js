import React,{useEffect, useState} from 'react'
import CreateToure from './CreateToure';
import Booking from './adminPages/Booking'
import User from './User'
import user_png from "../components/layouts/User.png"
import  '../App.css'
import {useNavigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import {useData} from '../components/layouts/DataContext'
const token = localStorage.getItem('token')
const Deshboard = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState('dashboard'); 
  const [islogin, setisLogin] = useState(false)
  const [user , setUser] = useState(null)
  const {shareData,toteluser,toteltour}  = useData()
  useEffect(()=>{
    if(token){
      const decode = jwtDecode(token)
      setUser({name:decode.name,photo:decode.photo})
    }else{
      setUser(null)
    }
    
  },[shareData,toteluser,toteltour])
  const logout = async()=>{
    try{
      const res = await fetch('http://127.0.0.1:8080/api/users/logout',{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
        },
      })
      if(res.ok){
        localStorage.removeItem('token');
        setisLogin(false);
        navigate('/login');
      }else{
        console.log("error")
      }
    }catch(eror){
      console.log("the api error", eror)
    }
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const renderContent = () => {
    switch (currentPage) {
      case "CreateToure":
        return <CreateToure/>;
      case "User":
        return <User/>
      case "Booking":
        return <Booking/>
      case 'dashboard':
        return (
          <>
<div class="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 ">
<div class="homeGrid">
 <div class="w-[50px] h-[50px] flex justify-center items-center bg-[#EFF2F7] rounded-full"><i class="fa-regular fa-eye text-[#3C50E0]"></i></div>
 <div class="flex justify-between items-end">
         <div>
             <h3 class="text-[25px] text-gray-800">{toteluser}</h3>
             <p class="text-[15px] text-slate-600">Total User</p>
         </div>
         <div>
             <p class="text-[16px] text-green-600 font-thin"> 0.98 % <i class="fa-solid fa-arrow-up"></i></p>
         </div>
 </div>
</div>

 <div class="homeGrid">
 <div class="w-[50px] h-[50px] flex justify-center items-center bg-[#EFF2F7] rounded-full"><i class="fa-solid fa-cart-shopping text-[#3C50E0]"></i></div>
 <div class="flex justify-between items-end">
         <div>
             <h3 class="text-[25px] text-gray-800">{shareData}</h3>
             <p class="text-[15px] text-slate-600">Total Booking</p>
         </div>
         <div>
             <p class="text-[16px] text-green-600 font-thin"> 2.38 % <i class="fa-solid fa-arrow-up"></i></p>
         </div>
 </div>
</div>

 <div class="homeGrid">
 <div class="w-[50px] h-[50px] flex justify-center items-center bg-[#EFF2F7] rounded-full"><i class="fa-solid fa-plane-circle-check text-[#3C50E0]"></i></div>
 <div class="flex justify-between items-end">
         <div>
             <h3 class="text-[25px] text-gray-800">29</h3>
             <p class="text-[15px] text-slate-600">Delivery</p>
         </div>
         <div>
             <p class="text-[16px] text-green-600 font-thin"> 0.88 % <i class="fa-solid fa-arrow-up"></i></p>
         </div>
 </div>
</div>

<div class="homeGrid">
 <div class="w-[50px] h-[50px] flex justify-center items-center bg-[#EFF2F7] rounded-full"><i class="fa-solid fa-user-group text-[#3C50E0]"></i></div>
 <div class="flex justify-between items-end">
         <div>
             <h3 class="text-[25px] text-gray-800">{toteltour}</h3>
             <p class="text-[15px] text-slate-600">Total Tour</p>
         </div>
         <div>
             <p class="text-[16px] text-green-600 font-thin"> 12.98 % <i class="fa-solid fa-arrow-up"></i></p>
         </div>
 </div>
</div>
</div>
          </>  
          
        );
      default:
        return (
          <div>
            <h2 className="text-gray-800 text-lg font-semibold">Not Found</h2>
            <p className="text-gray-600 mt-2">Page not found.</p>
          </div>
        );
    }
  };
  console.log("tour",toteltour)
  return (
    <>
     <div className="flex flex-col h-screen">
      <header className="bg-white text-black py-4 px-6 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <img className="w-8 h-8 rounded-full" src={user_png} alt="User Avatar" />
            <span className="ml-2"></span>
          </div>
          <button onClick={logout} className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none">Logout</button>
        </div>
      </header>

      <div className="flex-1 bg-gray-200 flex">

        <div className="w-64 bg-gray-800">
          <nav className="mt-10">
            <button onClick={() => handlePageChange('dashboard')} className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white">Dashboard</button>
            <button onClick={() => handlePageChange('CreateToure')} className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white">CreateToure</button>
            <button onClick={() => handlePageChange('User')} className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white">User</button>
            <button onClick={() => handlePageChange('Booking')} className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white">Booking</button>
          </nav>
        </div>
        <div className="flex-1  text-gray-600 body-font">
          <div className="p-6 ">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>

    </>
)
}

export default Deshboard
