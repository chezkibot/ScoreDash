import React, { useState } from "react";
import "./styles/App.css";
import CalcContainer from "./containers/CalcContainter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loader from "./components/Loader";
import Playground from "./components/playground";
import PrivateRoute from "./PrivateRoute";
import GraphContainer from "./containers/GraphContainer";
import ForgotPassword from "./components/ForgotPassword";
import LandingPage from "./components/LandingPage";

export default function App() {
  const [loader, setLoader] = useState(false);

  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <Router>
          <Navigation setLoader={setLoader} />
          <Switch>
            <PrivateRoute exact path="/" component={CalcContainer} />
            <PrivateRoute
              path="/graphs"
              component={GraphContainer}
            ></PrivateRoute>
              <PrivateRoute path="/playground" component={Playground} />

            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/welcome" component={LandingPage}>
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
}
