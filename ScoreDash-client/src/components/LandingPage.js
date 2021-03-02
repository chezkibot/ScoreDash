import React from "react";
import mock1 from "../images/mock-1.png";
import mock2 from "../images/mock-2.png";
import mock3 from "../images/mock-3.png";
import { Image } from "react-bootstrap";
function LandingPage() {
  return (
    <div className="landing-page">
      <div
        style={{
          display: "grid",
        }}
      >
        <div className="land-row">
          <h1 className="text-center">
            <b>Know</b> your grades
          </h1>
          <Image
            src={mock2}
            fluid
            style={{
              marginBottom: "2rem",
              margin: "auto",
              maxWidth: "70%",
            }}
          />
        </div>

        <div className="land-row white">
          <Image
            src={mock3}
            fluid
            style={{
              marginBottom: "2rem",
              margin: "auto",
              maxHeight: "500px",
            }}
          />

          <h1 className="text-center" style={{ color: "rgb(98 95 240)" }}>
            <b>Manage</b> your courses
          </h1>
        </div>
        <hr />
        <div className="land-row">
          <h1 className="text-center " style={{ maxWidth: "500px" }}>
            <b>Predict</b> your average score by playing around with future
            grades and see their effects on your final score
          </h1>
          <Image
            src={mock1}
            fluid
            style={{
              maxHeight: "550px",
              margin: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
