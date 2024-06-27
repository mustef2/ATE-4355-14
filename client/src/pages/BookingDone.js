import React from 'react'
import Layouts from '../components/layouts/Layouts'
import {Link} from 'react-router-dom'
import './BookingDone.css'

const BookingDone = () => {
  return (
    <Layouts>
<div class="BD-container">
    <div class="BD-stage">
        <div class="BD-content">
            <h2 class="BD-title">
                THANK YOU
            </h2>
            <p class="BD-message">
                YOUR TOUR IS BOOKED 
            </p>
        </div>

        <Link to="/" className="BD-link">
            <span>BACK TO HOME PAGE</span>
        </Link>
    </div>
</div>

    </Layouts>
  )
}

export default BookingDone
