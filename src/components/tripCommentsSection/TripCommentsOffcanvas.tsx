import Offcanvas from "react-bootstrap/Offcanvas";
import Trip from "../../models/Trip";
import "./TripCommentsOffcanvas.css";
import TripCommentsContainer from "./TripCommentsContainer";
import AddCommentForm from "./AddCommentForm";

interface Props {
  trip: Trip;
  refreshTrip: () => Promise<void>;
  show: boolean;
  handleClose: () => void;
}

const TripCommentsOffcanvas = ({
  trip,
  refreshTrip,
  show,
  handleClose,
}: Props) => {
  return (
    <>
      {trip && (
        <Offcanvas
          className="TripCommentsOffcanvas"
          placement="end"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <h2>
              {trip.nickname
                ? trip.nickname.toLowerCase()
                : trip.city.cityName.toLowerCase()}
            </h2>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <TripCommentsContainer trip={trip} refreshTrip={refreshTrip} />
            <AddCommentForm trip={trip} refreshTrip={refreshTrip} />
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </>
  );
};

export default TripCommentsOffcanvas;
