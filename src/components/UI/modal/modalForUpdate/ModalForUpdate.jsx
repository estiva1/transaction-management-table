import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

export const ModalForUpdate = (props) => {
  const [status, setStatus] = useState("Completed");
  const [saveButton, setSaveButton] = useState(true);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Transaction status change
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You are about to change the transaction status. Choose new one.</p>
        <Form.Select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value={"Canceled"}>Canceled</option>
          <option value={"Completed"}>Completed</option>
          <option value={"Pending"}>Pending</option>
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => props.handleConfirm(status)}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
