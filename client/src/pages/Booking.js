import React, { useEffect, useState } from "react";
import Imageslider from "../components/layouts/Imageslider";
import { FaStar } from "react-icons/fa";
import Layouts from "../components/layouts/Layouts";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './Booking.css'

const token = localStorage.getItem("token");

const reviews = {
  review: ""
};

const booking = {
  name: "",
  phone: 0,
  telebirrName: "",
  telebirrTransactionNumber: "",
  telebirrPhoneNumber: 0
};

const Booking = () => {
  const { id } = useParams();
  const [toureData, settoureData] = useState([]);
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState(reviews);
  const [tourReview, setTourReview] = useState([]);
  const [bookingTour, setBookingTour] = useState(booking);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const getReviewValue = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const getBookingData = (e) => {
    setBookingTour({ ...bookingTour, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getBooking();
    if (toureData.price && toureData.priceDiscount) {
      setPrice(toureData.price - toureData.priceDiscount);
    }
  }, [toureData]);

  const getBooking = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/tours/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        settoureData(data.data.toure);
        setImages(data.data.toure.images);
        setTourReview(data.data.toure.reviews);
      } else {
        console.log("Error getting data from API");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const postReview = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error("Token not found.");
      return;
    }
    const decode = jwtDecode(token);
    const user = decode.id;
    if (!user) {
      console.log("Invalid user");
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      console.error("Invalid rating.");
      return;
    }
    try {
      const { review } = message;
      const res = await fetch("http://127.0.0.1:8080/api/reviews", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          review,
          rating,
          user,
          tour: id
        })
      });
      if (res.ok) {
        console.log("Review posted successfully!");
        setMessage({ review: "" });
        setRating(null);
        getBooking();
      } else {
        console.log("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  const bookTour = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error("Token not found.");
      return;
    }
    const decode = jwtDecode(token);
    const user = decode.id;
    if (!user) {
      console.log("Invalid user");
      return;
    }
    try {
      const {
        name,
        phone,
        telebirrName,
        telebirrTransactionNumber,
        telebirrPhoneNumber
      } = bookingTour;
      const res = await fetch("http://127.0.0.1:8080/api/bookings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          tour: id,
          user,
          price,
          phone,
          telebirrName,
          telebirrTransactionNumber,
          telebirrPhoneNumber
        })
      });
      if (res.ok) {
        console.log("Booking posted successfully!");
        navigate("/bookingdone");
      } else {
        console.log("Failed to submit booking.");
      }
    } catch (error) {
      console.log("Error booking tour:", error);
    }
  };

  return (
    <Layouts>
   <div className="B-main-container">
  <section className="">
    <div className="B-tour-content">
      <div className="B-tour-left">
        <Imageslider images={images} />
        <div className="B-tour-details">
          <div className="B-tour-info">
            <h1 className="B-tour-title">{toureData.name}</h1>
            <div className="B-tour-price">
              <span>${toureData.price}</span>
              <span className="B-tour-duration"> / {toureData.duration} Days</span>
            </div>
            <div className="B-tour-ratings">
              <span className="B-tour-ratings-quantity">{toureData.ratingsQuantity} Ratings</span>
            </div>
            <div className="B-tour-group-size">
              {toureData.maxGroupSize} &bull; Person
            </div>
            <p className="B-tour-description">{toureData.description}</p>
          </div>
        </div>
        <div className="B-tour-review">
          <form onSubmit={postReview}>
            <div className="B-review-header">
            </div>
            <div className="B-review-stars">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      name="rating"
                      type="radio"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      className="B-sr-only"
                    />
                    <FaStar
                      size={50}
                      color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
            <div className="B-review-input">
              <div className="B-relative">
                <input
                  type="text"
                  value={message.review}
                  onChange={getReviewValue}
                  name="review"
                  id="review"
                  className="B-review-text"
                  placeholder="What is your thought?"
                  required
                />
                <button type="submit" className="B-review-submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div className="B-review-list">
            {tourReview.map((item, index) => (
              <div key={index} className="B-review-item">
                <div className="B-review-user">
                  <img
                    src={`http://localhost:8080/${item.user.photo}`}
                    alt={item.user.name}
                    className="B-review-user-photo"
                  />
                  <div className="B-review-user-info">
                    {item.user.name}
                    <div>
                      <span className="B-review-user-rating">{item.rating} Rating</span>
                    </div>
                  </div>
                </div>
                <div className="B-review-text1">{item.review}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="B-tour-right">
        <form onSubmit={bookTour}>
          <h2 className="B-book-now-title">Book Now</h2>
          <div className="B-input-group">
            <label htmlFor="name" className="B-input-label">Full Name</label>
            <input
              type="text"
              value={bookingTour.name}
              onChange={getBookingData}
              id="name"
              name="name"
              className="B-input-field"
            />
          </div>
          <div className="B-input-group">
            <label htmlFor="phone" className="B-input-label">Phone</label>
            <input
              type="number"
              value={bookingTour.phone}
              onChange={getBookingData}
              id="phone"
              name="phone"
              className="B-input-field"
            />
          </div>
          <div className="B-input-group">
            <label htmlFor="telebirrName" className="B-input-label">Telebirr Name</label>
            <input
              type="text"
              value={bookingTour.telebirrName}
              onChange={getBookingData}
              id="telebirrName"
              name="telebirrName"
              className="B-input-field"
            />
          </div>
          <div className="B-input-group">
            <label htmlFor="telebirrTransactionNumber" className="B-input-label">Telebirr Transaction Number</label>
            <input
              type="text"
              value={bookingTour.telebirrTransactionNumber}
              onChange={getBookingData}
              id="telebirrTransactionNumber"
              name="telebirrTransactionNumber"
              className="B-input-field"
            />
          </div>
          <div className="B-input-group">
            <label htmlFor="telebirrPhoneNumber" className="B-input-label">Telebirr Phone Number</label>
            <input
              type="text"
              value={bookingTour.telebirrPhoneNumber}
              onChange={getBookingData}
              id="telebirrPhoneNumber"
              name="telebirrPhoneNumber"
              className="B-input-field"
            />
          </div>
          <div className="Detail_tele">
            <h1>+251921216555</h1>
            <span> *pay the bill by this phone number</span>
          </div>
          <button type="submit" className="B-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  </section>
</div>

    </Layouts>
  );
};

export default Booking;
