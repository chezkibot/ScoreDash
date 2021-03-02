import React, { useState } from "react";
import "../styles/register.css";
import { withRouter, useHistory } from "react-router-dom";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { Alert, FormGroup } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { createUser } from "../api/functions";

const Register = ({ setLoader }) => {
  const { signup, googleLogin, facebookLogin, verify } = useAuth();

  const loading = async () => {
    setLoader(true);
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(1000);
    setLoader(false);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  return (
    <>
      {message && (
        <Alert variant="primary" className="text-center mb-3">
          {"Check your inbox for instructions to verify address"}
        </Alert>
      )}

      <div className="form-group mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!validateForm()}
        className="btn btn-block btn-lg"
        onClick={async (e) => {
          e.preventDefault();
          setMessage(true);
          const res = await signup(email, password);
          await verify();
          console.log(res.user);
          createUser(res.user);
          loading();
        }}
      >
        Register
      </button>
      <div className="hr-sect">or</div>
      <GoogleLoginButton
        onClick={async () => {
          try {
            const res = await googleLogin();
            console.log(res);
            createUser(res.user);
            history.push("/");
          } catch (err) {
            alert(err);
          }
        }}
      >
        Sign up with Google
      </GoogleLoginButton>
      <FacebookLoginButton
        onClick={async () => {
          try {
            const res = await facebookLogin();
            createUser(res.user);
            history.push("/");
          } catch (err) {
            alert(err);
          }
        }}
      >
        Sign up with Facebook
      </FacebookLoginButton>
    </>
  );
};

export default withRouter(Register);
