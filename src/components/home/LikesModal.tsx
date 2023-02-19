import Modal from "react-bootstrap/Modal";
import Trip from "../../models/Trip";
import LikesCard from "./LikesCard";
import "./LikesModal.css";

interface Props {
  show: boolean;
  handleClose: () => void;
  trip: Trip;
}

const LikesModal = ({ show, handleClose, trip }: Props) => {
  return (
    <Modal className="LikesModal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Likes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {trip.likes.map((like) => (
            <LikesCard key={like.uid} uid={like.uid} />
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default LikesModal;
