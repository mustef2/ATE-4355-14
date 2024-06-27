import { useState, useEffect } from "react";
import * as React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import user_png from "./User.png"
import "./Header.css";
const token = localStorage.getItem("token");

const Header = () => {
  const [isLogedIn, setIsLogrdIn] = useState(false);
  const [userprofile, setUserProfile] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const showSidebar = () => {
    setSidebarVisible(true);
  };

  const hideSidebar = () => {
    setSidebarVisible(false);
  };

  const logout = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8080/api/users/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (res.ok) {
        localStorage.removeItem("token");
        setIsLogrdIn(false);
        toast.success("logout seccuesfully");
        navigate("/");
      } else {
        toast.error("logout failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error: " + error.message);
    }
  };
  //user data
  const curent_user = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8080/api/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify()
      });
      if (res.ok) {
        const info_user = await res.json();
        setUserProfile(info_user.data.data);
        //console.log(info_user)
      } else {
        setIsLogrdIn(false);
        toast.error("Failed to fetch user data");
      }
    } catch (eror) {
      setIsLogrdIn(false);
      console.error("Error:", eror);
      toast.error("Error: " + eror.message);
    }
  };
  useEffect(() => {
    setRefreshPage(false);
    if (token) {
      setIsLogrdIn(true);
      curent_user();
    } else {
      setIsLogrdIn(false);
    }
  }, []);

  const Sign_Up_page = () => {
    setRefreshPage(true);
    navigate("/login");
  };
  return (
    <>
        <header className="header">
          <h2 className="logo">
            <a href="/">ORIGIN</a>
          </h2>
          <nav className="Nav">
            <ul className="sidebar">
              <li onClick={hideSidebar}>
                <a href="#">
                  <svg height="26" viewBox="0 96 960 960" width="26">
                    <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                  </svg>
                </a>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/tour">Toure</Link>
              </li>
            </ul>
            <ul className="On_sidebar">
              <li className="hideOnMobile">
                <Link to="/">Home</Link>
              </li>
              <li className="hideOnMobile">
                <Link to="/about">About</Link>
              </li>
              <li className="hideOnMobile">
                <Link to="/tour">Toure</Link>
              </li>
              <li className="hideOnMobile">
                {" "}
                {isLogedIn && (
                  <div className=" a_header">
                      <div className="user_div"> 
                      <img
                      className="img_user"
                      src={user_png}
                      alt={userprofile.name}
                      />
                      <span>
                      {userprofile.name} 
                      </span>
                  </div>
                  </div>
                )}
                {!isLogedIn && (
                  <>
                  <div className=" a_header" >
                    <button onClick={Sign_Up_page}>Register</button>
                  </div>
                  </>
                )}
              </li>
                {" "}
                {isLogedIn && (
              <li className="hideOnMobile">
                  <>
                  <div className="a_header">
                    <button onClick={logout}>Logout</button>
                  </div>
                  </>
              </li>
                )}
              <li className="menu-button" onClick={showSidebar}>
                <a href="#">
                  <svg height="26" viewBox="0 96 960 960" width="26">
                    <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>


        </header>
    </>
  );
};

export default Header;
