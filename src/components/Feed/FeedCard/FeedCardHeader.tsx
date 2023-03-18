import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Trip from "../../../models/Trip";
import { UserTrip } from "../../../models/UserProfile";
import "./FeedCardHeader.css";
import FeedCardParticipantsSection from "./FeedCardParticipantsSection";

interface Props {
  trip: Trip;
  userTrips: UserTrip[];
}

const FeedCardHeader = ({ trip, userTrips }: Props) => {
  const navigate = useNavigate();

  const handleViewTrip = (): void =>
    userTrips.some((userTrip) => userTrip.tripId === trip._id!)
      ? navigate(`/trips/trip-details/${trip._id!}`)
      : navigate(`/feed/trip-details/${trip._id!}`);

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
