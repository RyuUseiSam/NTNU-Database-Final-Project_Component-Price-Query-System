import React, { useState } from "react";
import "./LoginForm.scss";
import { FaUser, FaLock } from "react-icons/fa";

// Form Component
const Form = ({ isRegister, handleLogin, toggleForm }) => (
  <form onSubmit={handleLogin}>
    <h1>{isRegister ? "Register" : "Login"}</h1>
    <div className="login-wrapper__input-box">
      <input className="login-wrapper__user-inputbox" type="text" placeholder="Username" />
      <FaUser className="login-wrapper__icon" />
    </div>
    <div className="login-wrapper__input-box">
      <input className="login-wrapper__password-inputbox" type="password" placeholder="Password" />
      <FaLock className="login-wrapper__icon" />
    </div>
    {!isRegister && (
      <div className="login-wrapper__remember-forget">
        <label>
          <input type="checkbox" />
          Remember me
        </label>
        <a href="#">Forget password?</a>
      </div>
    )}
    <button className="login-wrapper__submit">{isRegister ? "Register" : "Login"}</button>
    <div className="login-wrapper__register-link">
      <p>
        {isRegister ? "Already have an account?" : "Don't have an account?"}
        <a href="#" onClick={toggleForm}>
          {isRegister ? "Login" : "Register"}
        </a>
      </p>
    </div>
  </form>
);

// Logged In Component
const LoggedIn = ({ username, handleLogout }) => (
  <div className="logged-in-message">
    <h1>Already Logged In!</h1>
    <div className="login-wrapper__input-box">
      <input className="login-wrapper__user_info" type="text" placeholder="Username" value={username} disabled />
      <FaUser className="login-wrapper__icon" />
    </div>
    <button className="login-wrapper__submit" onClick={handleLogout}>
      Logout
    </button>
  </div>
);

const LoginForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
    setUsername("User123");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        {!isLoggedIn ? (
          <Form isRegister={isRegister} handleLogin={handleLogin} toggleForm={toggleForm} />
        ) : (
          <LoggedIn username={username} handleLogout={handleLogout} />
        )}
      </div>
    </div>
  );
};

export default LoginForm;
