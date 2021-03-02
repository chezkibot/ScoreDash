import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/NavBar";
import logo from "../images/logo.png";
import { Navbar } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import SigninModals from "./SigninModals";
import { useHistory } from "react-router-dom";

export default function Navigation({ setLoader }) {
  const { user, logout } = useAuth();
  const history = useHistory();
  const homeLink = (
    <Nav.Item>
      <Nav.Link>
        <NavLink to="/">
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
      </Nav.Link>
    </Nav.Item>
  );

  const graphsLink = (
    <Nav.Item>
      <Nav.Link>
        <NavLink to="/graphs">graphs</NavLink>
      </Nav.Link>
    </Nav.Item>
  );

  const signOutLink = (
    <Nav.Item className="ml-auto">
      <Nav.Link>
        <NavLink
          to="/"
          onClick={async () => {
            await logout();
            history.push("/welcome");
            console.log("signed out");
          }}
        >
          Sign Out
        </NavLink>
      </Nav.Link>
    </Nav.Item>
  );

  const playgroundLink = (
    <Nav.Item>
      <Nav.Link>
        <NavLink to="/playground">Playground</NavLink>
      </Nav.Link>
    </Nav.Item>
  );

  return (
    <NavBar
      bg="light"
      sticky="top"
      className="nav-shadow"
      expand={user ? "sm" : ""}
    >
      {(user && user.emailVerified) ||
      (user && user.providerData[0].providerId == "facebook.com") ? (
        <>
          {homeLink}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <>
              {graphsLink} {playgroundLink} {signOutLink}
            </>
          </Navbar.Collapse>
        </>
      ) : (
        <>
          {homeLink}
          <div className="ml-auto mr-2">
            <SigninModals
              regFirst={false}
              text="Login"
              btnClassName="login-btn"
              setLoader={setLoader}
            />
          </div>
          <SigninModals
            regFirst={true}
            text="Sign Up"
            btnClassName="register-btn"
            setLoader={setLoader}
          />
        </>
      )}
    </NavBar>
  );
}
