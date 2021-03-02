import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function MyModal({
  popUpTitle,
  popUpBody,
  btnTitle,
  btnClassName,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className={btnClassName + " shadow-none"}
        variant="primary"
        onClick={handleShow}
      >
        {btnTitle}
      </Button>
      <Modal
        contentClassName="modal-custom"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header contentClassName="text-center" closeButton>
          <Modal.Title contentClassName="text-center ">
            <h3>{popUpTitle}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton>{popUpBody}</Modal.Body>
      </Modal>
    </>
  );
}
