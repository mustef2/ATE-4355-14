import React, { useState } from 'react'
import Layouts from '../components/layouts/Layouts'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { json } from 'react-router-dom';
const About = () => {
  
  const notify = () => toast.success("Wow so easy!",{
    position:"bottom-right"
  });
  return (
    <Layouts>
      <div className='container flex basis-1/2'>
      <div class="sm:flex items-center max-w-screen-xl">
    <div class="sm:w-1/2 p-10">
        <div class="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png"/>
        </div>
    </div>
    <div class="sm:w-1/2 p-5">
      
        <div class="text">
            <span class="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
            <h2 class="my-4 font-bold text-3xl  sm:text-4xl ">About <span class="text-indigo-600">Our Tour Company</span>
            </h2>
            <p class="text-gray-700">
            Travel is the movement of people between distant geographical locations. 
            Travel can be done by foot, bicycle, automobile, train, boat, bus, airplane, 
            ship or other means, with or without luggage, and can be one way or round trip.
            </p>
        </div>
    </div>
</div>
      </div>
        <ToastContainer />
    </Layouts>
  )
}

export default About
