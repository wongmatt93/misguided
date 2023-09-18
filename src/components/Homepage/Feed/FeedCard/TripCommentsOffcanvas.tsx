import Offcanvas from "react-bootstrap/Offcanvas";
import { Comment } from "../../../../models/Trip";
import AddCommentForm from "./AddCommentForm";
import TripCommentsContainer from "./TripCommentsContainer";

import "./TripCommentsOffcanvas.css";

interface Props {
  uid: string;
  tripId: string;
  nickname: string;
  comments: Comment[];
  cityName: string;
  refreshFeedTrips: () => Promise<void>;
  show: boolean;
  handleClose: () => void;
}

const TripCommentsOffcanvas = ({
  uid,
  tripId,
  nickname,
  comments,
  cityName,
  refreshFeedTrips,
  show,
  handleClose,
}: Props) => {
  return (
    <Offcanvas
      className="TripCommentsOffcanvas"
      placement="end"
      show={show}
      onHide={handleClose}
    >
      <Offcanvas.Header closeButton>
        <h2>{nickname?.toLowerCase() || cityName.toLowerCase()}</h2>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <TripCommentsContainer
          uid={uid}
          tripId={tripId}
          comments={comments}
          refreshFeedTrips={refreshFeedTrips}
        />
        <AddCommentForm
          uid={uid}
          tripId={tripId}
          refreshFeedTrips={refreshFeedTrips}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default TripCommentsOffcanvas;
