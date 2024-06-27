import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import Layouts from '../components/layouts/Layouts'
import img_4 from '../asset/mg3.jpg'
import {Link, useNavigate} from 'react-router-dom'
import {useData} from '../components/layouts/DataContext'
import './Tour.css'
const token = localStorage.getItem('token')
const Tour = () => {
    const [tourData , setToureData] = useState([])
    const navigate = useNavigate()
    const {Update_Total_Tour} = useData()
    useEffect(()=>{
        const ToureData = async()=>{
            try{
                const res = await fetch('http://127.0.0.1:8080/api/tours',{
                    method:"GET",
                    headers:{
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify()
                })
                if(res.ok){
                    const data = await res.json()
                    setToureData(data.data.tours)
                    Update_Total_Tour(data)
                }else{
                    console.log("res is not ok status")
                }
            }catch(eror){
                console.log("The error is fatch this api")
            }
        }
        ToureData()
    },[Update_Total_Tour])
    const BookingPage = (id)=>{
        if(!token){
        toast.error("Please Login Book Tour!",{
                position:"top-right"
            })
        }else{
            navigate(`/booking/${id}`)
        }
    }
  return (
    <Layouts>
<div className="tour-container">
  <section>
    <div className="tour-container2">
      <div className="tour-header">
        <div className="tour-title">
          <h2> ALL TOURE </h2>
        </div>
      </div>
      <div className="tour-lists">
        {tourData.map(data => {
          return (
            <div key={data.id} className="tour-item">
              <div className="tour-image">
                <Link to={`/booking/${data.id}`}>
                  <img
                    src={`http://127.0.0.1:8080/${data.imageCover}`}
                    alt="Sunset in the mountains"
                    className="tour-image__img"
                  />
                </Link>
                <Link to={`/booking/${data.id}`}>
                  <div className="tour-link">
                    {data.difficulty}
                  </div>
                </Link>
              </div>
                <div className="tour-group">
                  <span>Group</span>
                  <div className="tour-group-size">
                    {data.maxGroupSize} &bull; Person
                  </div>
                </div>
                <h4 className="tour-name">{data.name}</h4>
                <div className="tour-price">
                  <span>${data.price}</span>
                  <span>/ {data.duration} Days</span>
                </div>
                <div className="tour-ratings">
                  <span>{data.ratingsQuantity} Ratings</span>
                </div>
                <div className="tour-summary">
                  <span>{data.summary}</span>
                </div>
                <div className="tour-discount">
                  <div className="tour-discount-info">
                    <span>Price Discount </span> $ {data.priceDiscount}
                  </div>
                  <div className="tour-reviews">
                    <div className="tour-review-icons">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                        <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                        <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                        <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                        <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                        <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"/>
                      </svg>
                    </div>
                    <div className="tour-review-count">
                      {data.reviews} reviews
                    </div>
                  </div>
                </div>
                  <button className="tour-book-btn" onClick={() => BookingPage(data.id)}>
                    Book Ticket
                  </button>
            </div>
          );
        })}
        <ToastContainer />
      </div>
    </div>
  </section>
</div>


    </Layouts>
  )
}

export default Tour
