import React from "react";
import "./LoginForm.scss";
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
  return (
    <div className="login-page">
      <div className="login-wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="login-wrapper__input-box">
            <input
              className="login-wrapper__user-inputbox"
              type="text"
              placeholder="Username"
            />
            <FaUser className="login-wrapper__icon" />
          </div>
          <div className="login-wrapper__input-box">
            <input
              className="login-wrapper__password-inputbox"
              type="password"
              placeholder="Password"
            />
            <FaLock className="login-wrapper__icon" />
          </div>
          <div className="login-wrapper__remember-forget">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forget password?</a>
          </div>
          <button className="login-wrapper__submit">Login</button>
          <div className="login-wrapper__register-link">
            <p>
              Don't have an account?<a href="#">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
