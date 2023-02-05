import Modal from "react-bootstrap/Modal";
import { AiFillLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Trip from "../../models/Trip";
import "./ItineraryModal.css";
import SingleDayItinerary from "./SingleDayItinerary";

interface Props {
  trip: Trip | null;
  show: boolean;
  handleClose: () => void;
}

const ItineraryModal = ({ trip, show, handleClose }: Props) => {
  const navigate = useNavigate();

  const handleClick = (): void => navigate("/trips");

  return (
    <Modal className="ItineraryModal" show={show} onHide={handleClose}>
      {trip && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Review Your Trip</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>{trip!.hotel}</h3>
            <ul>
              {trip &&
                trip.schedule.map((item, index) => (
                  <SingleDayItinerary
                    key={index}
                    index={index}
                    schedule={item}
                  />
                ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <div className="like-buttons-container">
              <AiFillLike className="thumbs" onClick={handleClick} />
              <AiFillLike
                className="thumbs thumbs-down"
                onClick={handleClick}
              />
            </div>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ItineraryModal;
