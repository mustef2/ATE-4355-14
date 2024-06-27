import React, { useEffect, useState } from "react";
import { useData } from "../../components/layouts/DataContext";
import './ABooking.css'

const Booking = () => {
  const [booking, setBooking] = useState([]);
  const { UpdateSharedData } = useData();
  const token = localStorage.getItem("token");

  // Get all bookings
  const fetchBookings = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8080/api/bookings", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        const data = await res.json();
        setBooking(data.data.data);
        UpdateSharedData(data.results);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []); // Empty dependency array to run once on mount

  // Delete booking
  const deleteBooking = async (bookingId) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8080/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.ok) {
        console.log("Booking deleted");
        fetchBookings();
      } else {
        console.log("Error deleting booking");
      }
    } catch (error) {
      console.log("Error during delete:", error);
    }
  };

  return (
    <div className="AB-booking-table-container">
    <div className="AB-table-wrapper">
      <div className="AB-table-container">
        <div className="AB-table-content">
          <table className="AB-booking-table">
            <thead>
              <tr>
                <th scope="col" className="AB-table-header">Name</th>
                <th scope="col" className="AB-table-header">Phone</th>
                <th scope="col" className="AB-table-header">Telebirr Name</th>
                <th scope="col" className="AB-table-header">Telebirr Transaction Number</th>
                <th scope="col" className="AB-table-header">Telebirr Phone Number</th>
                <th scope="col" className="AB-table-header">Price</th>
                <th scope="col" className="AB-table-header-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((data, index) => (
                <tr key={index} className={index % 2 === 0 ? "AB-table-row-even" : "AB-table-row-odd"}>
                  <td className="AB-table-cell">{data.name}</td>
                  <td className="AB-table-cell">+251{data.phone}</td>
                  <td className="AB-table-cell">{data.telebirrName}</td>
                  <td className="AB-table-cell">{data.telebirrTransactionNumber}</td>
                  <td className="AB-table-cell">+251{data.telebirrPhoneNumber}</td>
                  <td className="AB-table-cell">{data.price}</td>
                  <td className="AB-table-cell-action">
                    <button
                      onClick={() => deleteBooking(data._id)}
                      type="button"
                      className="AB-delete-button"
                    >
                      Not Paid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Booking;
