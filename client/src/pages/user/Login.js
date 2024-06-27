import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import img from "/Users/owner/Downloads/ToureApp-main/client/src/components/layouts/Loginb.jpeg";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";

const YOUR_PERSONAL_TOKEN = "mohammedaminohassenawel";
const SignUpValue = {
  name: "",
  email: "",
  photo: null,
  password: "",
  passwordConform: ""
};
const LoginValue = {
  email: "",
  password: ""
};
const Login = () => {
  const navgate = useNavigate();
  const [acount, ToggleAccout] = useState("login");
  const [signup, Setsignup] = useState(SignUpValue);
  const [userLogin, SetuserLogin] = useState(LoginValue);
  const [error, SetError] = useState("");

  const SiginUp = () => {
    acount === "signup" ? ToggleAccout("login") : ToggleAccout("signup");
  };

  const showSuccessMessage = () => {
    toast.success("Signup successful!", {
      position: "bottom-left"
    });
  };

  const InputSignUp = (e) => {
    Setsignup({ ...signup, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    Setsignup({
      ...signup,
      photo: e.target.files[0] // Store the selected image file
    });
  };
  const InputLogin = (e) => {
    SetuserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const SignUpform = async (e) => {
    e.preventDefault();
    console.log(signup);
    const { name, email, photo, password, passwordConform } = signup;
    const formData = new FormData();
    // Append form fields to FormData object
    formData.append("name", name);
    formData.append("email", email);
    formData.append("photo", photo);
    formData.append("password", password);
    formData.append("passwordConform", passwordConform);
    //console.log(formData.name)
    const res = await fetch("http://localhost:8080/api/users/signup", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${YOUR_PERSONAL_TOKEN}`
      },
      body: formData
    });
    try {
      const res_data = await res.json();
      if (res.ok) {
        const { token } = res_data;
        console.log("Received token:", token);
        // Save the token in localStorage
        localStorage.setItem("token", token);
        showSuccessMessage();
        setTimeout(() => {
          ToggleAccout("login");
        }, 2000);
      } else {
        console.error("Signup failed:", res_data.error);
        toast.error("Signup failed: " + res_data.error);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Error: " + err.message);
    }
  };

  const LoginForm = async (e) => {
    e.preventDefault();
    const { email, password } = userLogin;
    console.log(email);
    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${YOUR_PERSONAL_TOKEN}`
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    try {
      const res_login = await res.json();
      console.log("Response data:", res_login);
      if (res.ok) {
        const { token } = res_login;
        console.log("Received token:", token);
        localStorage.setItem("token", token);
        const decode = jwtDecode(token);
        const userRole = decode.role;
        toast.success("login successfully !", {
          position: "top-right"
        });
        setTimeout(() => {
          if (userRole === "admin") {
            navgate("/dashboard");
          } else {
            navgate("/");
          }
        }, 1000);
      } else {
        console.error("Login  failed:", res_login.error);
        toast.error("Login failed: " + res_login.error, {
          position: "top-right"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error: " + error.message, {
        position: "top-right"
      });
    }
  };
  return (
    <>
<div className="log-container">
  {acount === "login" ? (
    <section
      className="log-section"
      style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center"
      }}
    >
      <div className="log-div">
        <div className="log-div-inner">
          <div className="log-content">
            <h1 className="log-title">Login</h1>
            <form className="log-form" action="#">
              <div className="log-form-group">
                <label
                  htmlFor="email"
                  className="log-label"
                >
                  Your email
                </label>
                <input
                  type="email"
                  onChange={(e) => InputLogin(e)}
                  name="email"
                  id="email"
                  className="log-input"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div className="log-form-group">
                <label
                  htmlFor="password"
                  className="log-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => InputLogin(e)}
                  name="password"
                  id="password"
                  className="log-input"
                  placeholder="••••••••"
                  required=""
                />
              </div>
              <button
                type="submit"
                onClick={LoginForm}
                className="log-button"
              >
                Login
              </button>
              <button
                onClick={() => SiginUp()}
                type="submit"
                className="log-button"
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section
      className="log-section"
      style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center"
      }}
    >
      <div className="log-div">
        <div className="log-div-inner">
          <div className="log-content">
            <h1 className="log-title">Create an account</h1>
            <form
              className="log-form"
              enctype="multipart/form-data"
              method="post"
              action="/uploads"
            >
              <div className="log-form-group">
                <label
                  htmlFor="name"
                  className="log-label"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  onChange={(e) => InputSignUp(e)}
                  name="name"
                  id="name"
                  className="log-input"
                  placeholder="name"
                  required=""
                />
              </div>
              <div className="log-form-group">
                <label
                  htmlFor="email"
                  className="log-label"
                >
                  Your email
                </label>
                <input
                  type="email"
                  onChange={(e) => InputSignUp(e)}
                  name="email"
                  id="email"
                  className="log-input"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div className="log-form-group">
                <label
                  htmlFor="photo"
                  className="log-label"
                >
                  Profile
                </label>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                  name="photo"
                  id="photo"
                  className="log-input"
                  placeholder="file upload"
                />
              </div>
              <div className="log-form-group">
                <label
                  htmlFor="password"
                  className="log-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => InputSignUp(e)}
                  name="password"
                  id="password"
                  className="log-input"
                  placeholder="••••••••"
                  required=""
                />
              </div>
              <div className="log-form-group">
                <label
                  htmlFor="confirm-password"
                  className="log-label"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  onChange={(e) => InputSignUp(e)}
                  name="passwordConform"
                  id="confirm-password"
                  className="log-input"
                  placeholder="••••••••"
                  required=""
                />
              </div>
              <button
                type="submit"
                onClick={SignUpform}
                className="log-button"
              >
                Create an account
              </button>
              <button
                onClick={() => SiginUp()}
                type="submit"
                className="log-button"
              >
                Already have an account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )}
  <ToastContainer />
</div>


    </>
  );
};

export default Login;
