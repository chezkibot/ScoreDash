import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Register from "../Forms/Register";
import Login from "../Forms/Login";
import ForgotPassword from "./ForgotPassword";

export default function SigninModals({
  regFirst,
  text,
  btnClassName,
  setLoader,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [register, setRegister] = useState(regFirst);
  const [login, setLogin] = useState(true);

  const activate = (form) => {
    switch (form) {
      case "register":
        setRegister(true);
        break;
      case "login":
        setRegister(false);
        setLogin(true);
        break;
      case "reset-psw":
        setRegister(false);
        setLogin(false);
    }
  };

  const RegisterModal = (
    <Modal
      contentClassName="modal-custom"
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="text-center w-100">
          <h3>Register</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body closeButton>
        <Register setLoader={setLoader} />
        <p
          className="mt-3 text-center"
          onClick={() => {
            activate("login");
          }}
        >
          Already have an account?
          <span className="text-link"> Log In</span>
        </p>
      </Modal.Body>
    </Modal>
  );

  const LoginModal = (
    <Modal
      contentClassName="modal-custom"
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="text-center w-100">
          <h3>Login</h3>
          <h6>
            Don't have an account?
            <span
              className="text-link mt-1"
              onClick={() => {
                activate("register");
              }}
            >
              {" "}
              Sign up
            </span>
          </h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body closeButton>
        <Login setLoader={setLoader} />
        <p
          className="text-right mt-2"
          onClick={() => {
            activate("reset-psw");
          }}
        >
          Forgot your <span className="text-link">password?</span>
        </p>
      </Modal.Body>
    </Modal>
  );

  const ResetPasswordModal = (
    <Modal
      contentClassName="modal-custom"
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="text-center w-100">
          <h3>Reset Password</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body closeButton>
        <ForgotPassword />
      </Modal.Body>
    </Modal>
  );

  return (
    <>
      <Button
        className={btnClassName}
        variant="primary"
        onClick={() => {
          setRegister(regFirst);
          setLogin(!regFirst);
          handleShow();
        }}
      >
        {text}
      </Button>
      {register ? RegisterModal : login ? LoginModal : ResetPasswordModal}
    </>
  );
}
