import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Trip from "../../../models/Trip";
import "./FeedCardHeader.css";
import FeedCardParticipantsSection from "./FeedCardParticipantsSection";

interface Props {
  trip: Trip;
  userTripIds: string[];
}

const FeedCardHeader = ({ trip, userTripIds }: Props) => {
  const navigate = useNavigate();

  const handleViewTrip = (): void =>
    userTripIds.some((userTripId) => userTripId === trip._id!)
      ? navigate(`/trips/trip-details/${trip._id!}`)
      : navigate(`/feed/trip-details/${trip._id!}`);

  return (
    <div className="FeedCardHeader">
      <FeedCardParticipantsSection participants={trip.participants} />
      <Button variant="warning" onClick={handleViewTrip}>
        View Trip
      </Button>
    </div>
  );
};

export default FeedCardHeader;
