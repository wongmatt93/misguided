import Offcanvas from "react-bootstrap/Offcanvas";
import FullTrip from "../../models/Trip";
import "./TripCommentsOffcanvas.css";
import TripCommentsContainer from "./TripCommentsContainer";
import AddCommentForm from "./AddCommentForm";

interface Props {
  trip: FullTrip;
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
  const { _id: tripId, nickname, comments, city } = trip;

  return (
    <Offcanvas
      className="TripCommentsOffcanvas"
      placement="end"
      show={show}
      onHide={handleClose}
    >
      <Offcanvas.Header closeButton>
        <h2>{nickname?.toLowerCase() || city.cityName.toLowerCase()}</h2>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <TripCommentsContainer
          tripId={tripId!}
          comments={comments}
          refreshTrip={refreshTrip}
        />
        <AddCommentForm tripId={tripId!} refreshTrip={refreshTrip} />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default TripCommentsOffcanvas;
