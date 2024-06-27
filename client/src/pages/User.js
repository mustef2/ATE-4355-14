import React, { useEffect, useState } from "react";
import Layouts from "../components/layouts/Layouts";
import { jwtDecode } from "jwt-decode";
import { useData } from "../components/layouts/DataContext";
import './User.css'
import userpng from '../components/layouts/User.png'
const token = localStorage.getItem("token");
const User = () => {
  const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [curentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const { UpdatetotalUserData } = useData();
  const resultsPerPage = 10;
  // get all user data
  const User_data = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8080/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify()
      });
      if (!res.ok) {
        console.log("daataaaaaa");
      }
      const data = await res.json();
      console.log(data);
      setUserData(data.data.user);
      setTotalResults(data.results);
      UpdatetotalUserData(data.results);
    } catch (error) {
      console.log("somethink is wrong");
    }
  };
  const totalpage = Math.ceil(totalResults / resultsPerPage);
  const handelNextPage = () => {
    if (curentPage < totalpage) {
      setCurrentPage(curentPage + 1);
    }
  };
  const handelPrePage = () => {
    if (curentPage > 1) {
      setCurrentPage(curentPage - 1);
    }
  };
  useEffect(() => {
    User_data();
    if (token) {
      const decode = jwtDecode(token);
      setCurrentUser({
        id: decode.id,
        name: decode.name,
        email: decode.email,
        photo: decode.photo,
        role: decode.role
      });
      setIsAdmin(decode.role === "admin");
    } else {
      setCurrentUser(null);
    }
    setLoading(false);
  }, [curentPage, UpdatetotalUserData]);

  // DELETE USER FROM API
  const delete_user = async (userID) => {
    try {
      const res = await fetch("http://127.0.0.1:8080/api/users/" + userID, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        console.log("Show ERROR");
      }
      User_data();
    } catch (eror) {
      console.log("error", eror);
    }
  };

  if (loading) {
    return <p>Loading...</p>; 
  }
  const startIndex = (curentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const displayedUserData = userData.slice(startIndex, endIndex);
  const PageNumbers = [];
  for (let i = 1; i <= totalpage; i++) {
    PageNumbers.push(i);
  }
  if (!isAdmin) {
    return <p>You are not authorized to access this page.</p>;
  }
  return (
    <>
      <div className="user-container">
  <div className="user-profile-container">
    <div className="user-profile-wrapper">
      <div className="user-profile-content">
        {currentUser ? (
          <div className="user-info">
            <div className="user-avatar-container">
              <img
                className="user-avatar"
                src={userpng}
                alt=""
              />
            </div>
            <div className="user-details">
              <h3 className="user-name">{currentUser.name}</h3>
              <div className="user-role-container">
                <p className="user-role">{currentUser.role}</p>
              </div>
              <table className="user-table">
                <tbody className="user-table-body">
                  <tr className="user-table-row">
                    <td className="user-table-cell">Address</td>
                    <td className="user-table-cell">King George VI St, AAiT, Addis Ababa</td>
                  </tr>
                  <tr className="user-table-row">
                    <td className="user-table-cell">Phone</td>
                    <td className="user-table-cell">+251 921216555</td>
                  </tr>
                  <tr className="user-table-row">
                    <td className="user-table-cell">Email</td>
                    <td className="user-table-cell">{currentUser.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="user-login-message">Please log in to view user information</p>
        )}
      </div>
    </div>
  </div>
  <div className="user-table-container">
    <div className="user-table-wrapper">
      <table className="user-data-table">
        <thead className="user-table-head">
          <tr className="user-table-header-row">
            <th className="user-table-header">ID</th>
            <th className="user-table-header">Name</th>
            <th className="user-table-header">Email</th>
            <th className="user-table-header">Status</th>
            <th className="user-table-header">Action</th>
          </tr>
        </thead>
        <tbody className="user-table-body">
          {displayedUserData.map((data) => {
            return (
              <tr key={data._id} className="user-table-row">
                <td className="user-table-cell">
                  <div className="user-id-container">
                    <div className="user-id">{data._id}</div>
                  </div>
                </td>
                <th className="user-table-header-cell">
                  <div className="user-name-container">
                    <div className="user-name">{data.name}</div>
                  </div>
                </th>
                <td className="user-table-cell">
                  <div className="user-email">{data.email}</div>
                </td>
                <td className="user-table-cell">
                  <div className="user-role-container">
                    <div className="user-role">{data.role}</div>
                  </div>
                </td>
                <td className="user-table-cell">
                  <button className="user-delete-button" onClick={() => delete_user(data._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className="user-pagination-container">
      <span className="user-pagination-info">
        Showing <span className="user-current-page">{curentPage}</span> to <span className="user-total-page">{totalpage}</span> of <span className="user-total-results">{totalResults}</span> Entries
      </span>
    </div>
  </div>
</div>
    </>
  );
};
export default User;
