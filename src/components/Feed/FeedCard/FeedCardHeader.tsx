import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Trip from "../../../models/Trip";
import "./FeedCardHeader.css";
import FeedCardParticipantsSection from "./FeedCardParticipantsSection";

interface Props {
  trip: Trip;
}

const FeedCardHeader = ({ trip }: Props) => {
  const navigate = useNavigate();

  const handleViewTrip = (): void => navigate(`/trip-details/${trip._id!}`);

  return (
    <div className="FeedCardHeader">
      <FeedCardParticipantsSection participants={trip.participantsUids} />
      <Button variant="warning" onClick={handleViewTrip}>
        View Trip
      </Button>
    </div>
  );
};

export default FeedCardHeader;
