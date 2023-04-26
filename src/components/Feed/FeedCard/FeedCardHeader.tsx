import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Trip from "../../../models/Trip";
import "./FeedCardHeader.css";
import FeedCardParticipantsSection from "./FeedCardParticipantsSection";

interface Props {
  trip: Trip;
}

const FeedCardHeader = ({ trip }: Props) => {
  const { pastTrips } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleViewTrip = (): void =>
    pastTrips.some((pastTrip) => pastTrip._id! === trip._id!)
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
