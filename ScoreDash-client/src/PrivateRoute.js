import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        // return user ? <Component {...props} /> : <Redirect to="/welcome" />;
        {
          if (
            (user && user.emailVerified) ||
            (user && user.providerData[0].providerId == "facebook.com")
          )
            return <Component {...props} />;
          else {
            return <Redirect to="/welcome" />;
          }
        }
      }}
    ></Route>
  );
}
