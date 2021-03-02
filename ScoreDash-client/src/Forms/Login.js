import React, { useState } from "react";

import { useHistory, withRouter } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

const Login = ({ setLoader }) => {
  const { login, googleLogin, facebookLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const loading = async () => {
    setLoader(true);
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(1000);
    setLoader(false);
  };

  return (
    <div className="form">
      <div className="form-group mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email Address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="form-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Your Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button
        className="btn btn-block btn-lg"
        type="submit"
        block
        size="lg"
        onClick={async () => {
          try {
            await login(email, password);
            loading();
          } catch (error) {
            alert(error.message);
          }
          history.push("/");
        }}
        type="submit"
        disabled={!validateForm()}
      >
        Login
      </button>
      <div className="hr-sect">or</div>

      <GoogleLoginButton
        onClick={async () => {
          try {
            await googleLogin();
            loading();
            history.replace("/");
          } catch (err) {
            alert(err);
          }
        }}
      />
      <FacebookLoginButton
        onClick={async () => {
          try {
            const res = await facebookLogin();
            console.log(res);
            loading();
            history.push("/");
          } catch (err) {
            alert(err);
          }
        }}
      >
        Login with Facebook
      </FacebookLoginButton>
    </div>
  );
};

export default withRouter(Login);
