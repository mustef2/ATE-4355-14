import React, { useEffect, useState } from 'react'
import Layouts from '../components/layouts/Layouts'
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import img_1 from '../asset/mg1.jpg'
import img_2 from '../asset/mg2.jpg'
import img_3 from '../asset/mg3.jpg'
import img_4 from '../asset/mg3.jpg'
import g1 from '/Users/owner/Downloads/ToureApp-main/client/src/components/layouts/User.png'
import g2 from '../asset/g2.jpg'
import g3 from '../asset/g3.jpg'
import g4 from '../asset/g4.jpg'
import g5 from '../asset/g5.jpg'
import g6 from '../asset/g6.jpg'
import g7 from '/Users/owner/Downloads/ToureApp-main/client/src/components/layouts/Images/GR.png'
import g8 from '/Users/owner/Downloads/ToureApp-main/client/src/components/layouts/Images/Lux.png'
import g9 from '../asset/g9.jpg'
import g10 from '../asset/g10.jpg'
import g11 from '../asset/g11.jpg'
import g12 from '../asset/g12.jpg'
import g13 from '../asset/g13.jpg'
import {useData} from '../components/layouts/DataContext'
import profile from '../asset/ex.png'

import './Home.css'
import '../App.css'


const token = localStorage.getItem('token')
const Home = () => {
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

  <div className="hero_text_cover">
<div className="hero-text">
            <h1>Welcome to Adventure</h1>
            <p>Explore the world with us</p>
          </div>
  </div>
  <div className='basis-1'>
  </div>
  <div className='contentCenter'>
  <section className="our-services">
            <h2>Our Services</h2>
            <div className="service-list">
                <div className="service-item">
                    <img src={g7} alt="Group Travel" />
                    <h3>Group Travel</h3>
                    <p>Enjoy the company of others while discovering new destinations together.</p>
                </div>
                <div className="service-item">
                    <img src={g8} alt="Luxury Resorts" />
                    <h3>Luxury Resorts</h3>
                    <p>Stay at exquisite resorts with exceptional service and comfort.</p>
                </div>
                <div className="service-item">
                    <img src={g6} alt="Eco Tours" />
                    <h3>Eco Tours</h3>
                    <p>Explore the natural world in an environmentally friendly way.</p>
                </div>
            </div>
        </section>
    <section className='section2'>
      <h1 className='section2Title'>Our Feature Tours</h1>
      <div className='tourGrid'>
        {tourData.map((data, index) => (
          <div key={index} className="tourCard">
            <div className='tourImage'>
              <img className="tourImg" src={data.imageCover} alt="Tour"/>
            </div>
            <div className='tourInfo'>
              <span className="tourType">Group</span>
              <h4 className="tourName">{data.name}</h4>
              <div className="tourDetails">
                <span className="tourPrice">${data.price}</span>
                <span className="tourDuration">{data.duration} Days</span>
              </div>
              <div className="tourCapacity">
                <span>{data.maxGroupSize} Person</span>
              </div>
              <div className="tourDescription">
                <span>{data.description.length > 250 ? `${data.description.substring(0, 250)}...` : data.description }</span>
              </div>
              <div className="tourDiscount">
                <div className="tourDiscountPrice">
                  <span className="tourDiscountText">Price Discount {data.price}</span>
                  <span className="tourDiscountValue">${data.ratingsAverage}</span>
                </div>
              </div>
              <button onClick={() => BookingPage(data._id)} className="tourButton">Details</button>
            </div>
          </div>
        ))}
      </div>
    </section>
    <section className="why-us">
            <h2>Why Choose Us?</h2>
            <p>At ORIGIN, we specialize in crafting unforgettable travel experiences tailored to your personal tastes and preferences. Our expert team is dedicated to ensuring every detail is perfect, from bespoke itineraries to local, authentic adventures.</p>
            <ul>
                <li>
                    <div><strong>Personalized Services:</strong></div> Custom trips that match your dream destination and activities.
                </li>
                <li>
                    <div><strong>Expert Knowledge:</strong></div> Years of experience and insights into the secrets of the travel industry.
                </li>
                <li>
                    <div><strong>Exceptional Value:</strong></div> Competitive pricing with exclusive benefits for an unmatched value proposition.
                </li>
                <li>
                    <div><strong>24/7 Support:</strong></div> Full-time support before, during, and after your trip to ensure a seamless experience.
                </li>
            </ul>
        </section>
        <section className="section1">
      <div className="section1Inner">
        <div className="section1Content">
          <h1 className="section1Title">World Traveling Open the Door to Creating New Memory</h1>
          <p className="section1Text">Traveling with loved ones, friends, or even fellow adventurers fosters a bond through shared experiences. The memories created during these journeys become the foundation of lifelong relationships, as you reminisce about the adventures, laughter, and challenges faced together</p>
        </div>
      </div>
    </section>
        <section className='section3'>
            <div className="section3container">
                <h1 className="news-updates-title">News and Updates</h1>
                <div className="news-cards">
                    <div className="news-card">
                        <img src={g2} alt="News Image 1" className="news-image" />
                        <div className="news-content">
                            <h2 className="news-heading">Exciting News Title 1</h2>
                            <p className="news-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel eros eget erat facilisis luctus.</p>
                            <a href="#" className="read-more">Read more</a>
                        </div>
                    </div>
                    <div className="news-card">
                        <img src={g2} alt="News Image 2" className="news-image" />
                        <div className="news-content">
                            <h2 className="news-heading">Exciting News Title 2</h2>
                            <p className="news-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel eros eget erat facilisis luctus.</p>
                            <a href="#" className="read-more">Read more</a>
                        </div>
                    </div>
                    <div className="news-card">
                        <img src={g2} alt="News Image 3" className="news-image" />
                        <div className="news-content">
                            <h2 className="news-heading">Exciting News Title 3</h2>
                            <p className="news-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel eros eget erat facilisis luctus.</p>
                            <a href="#" className="read-more">Read more</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    <section className='section4'>
      <h1 className='section4Title'>Experience</h1>
      <div className='section4Content'>
        <div className='section4Text'>
          <h1 className='section4TextTitle'>Moon hashtag pop-up try-hard offal truffaut</h1>
          <div className='section3TextDescription'>Pour-over craft beer pug drinking vinegar live-edge gastropub, keytar neutra sustainable fingerstache kickstarter.</div>
        </div>
        <div className='section4Stats'>
          <div className='statItem'>
            <h2 className='statNumber'>2.7K</h2>
            <p className='statLabel'>Users</p>
          </div>
          <div className='statItem'>
            <h2 className='statNumber'>1.8K</h2>
            <p className='statLabel'>Subscribes</p>
          </div>
          <div className='statItem'>
            <h2 className='statNumber'>35</h2>
            <p className='statLabel'>Downloads</p>
          </div>
          <div className='statItem'>
            <h2 className='statNumber'>4</h2>
            <p className='statLabel'>Products</p>
          </div>
        </div>
      </div>
    </section>

    <section className='section5'>
      <h1 className='section5Title'>Visit Our Customer Tour Gallery</h1>
      <div className='galleryGrid'>
        <div className='galleryItem'>
          <img className="galleryImg" src={g2} alt="Gallery"/>
          <div className="User_deatil">
            <img src={g1} alt="" className="user_profile" />
            <h2 className="user_name">Origin</h2>
          </div>
        </div>
        <div className='galleryItem'>
          <img className="galleryImg" src={g3} alt="Gallery"/>
          <div className="User_deatil">
            <img src={g1} alt="" className="user_profile" />
            <h2 className="user_name">Origin</h2>
          </div>
        </div>
        <div className='galleryItem'>
          <img className="galleryImg" src={g4} alt="Gallery"/>
          <div className="User_deatil">
            <img src={g1} alt="" className="user_profile" />
            <h2 className="user_name">Origin</h2>
          </div>
        </div>
        <div className='galleryItem'>
          <img className="galleryImg" src={g5} alt="Gallery"/>
          <div className="User_deatil">
            <img src={g1} alt="" className="user_profile" />
            <h2 className="user_name">Origin</h2>
          </div>
        </div>
      </div>
    </section>
  </div>

    </Layouts>
  )
}

export default Home