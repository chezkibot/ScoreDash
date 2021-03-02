import React, { useRef, useState } from "react";
import { Button, Tooltip, Overlay } from "react-bootstrap";
import { BsInfo } from "react-icons/bs";
const Example = ({ infoText }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Button
        ref={target}
        onClick={() => setShow(!show)}
        style={{ padding: "0px !important" }}
      >
        <BsInfo size="20px" />
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {infoText}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default Example;
