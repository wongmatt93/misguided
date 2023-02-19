import Modal from "react-bootstrap/Modal";
import Trip from "../../models/Trip";
import AddCommentForm from "./AddCommentForm";
import CommentCard from "./CommentCard";
import "./CommentsModal.css";

interface Props {
  show: boolean;
  handleClose: () => void;
  trip: Trip;
}

const CommentsModal = ({ show, handleClose, trip }: Props) => {
  return (
    <Modal className="CommentsModal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {trip.comments.map((comment) => (
            <CommentCard key={comment.date} comment={comment} />
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <AddCommentForm trip={trip} />
      </Modal.Footer>
    </Modal>
  );
};

export default CommentsModal;
