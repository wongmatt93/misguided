import { Button, Modal } from "react-bootstrap/";
import "./SubmissionModal.css";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const SubmissionModal = ({ show, handleClose }: Props) => {
  return (
    <Modal className="SubmissionModal" show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Thank you for your rating</Modal.Title>
      </Modal.Header>

      <Modal.Body>Your submission has been received</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubmissionModal;
