import { Button } from "react-bootstrap";
import { Participant } from "../../../models/Trip";
import "./FeedCardHeader.css";
import FeedCardParticipantsSection from "./FeedCardParticipantsSection";

interface Props {
  participants: Participant[];
  handleViewTrip: () => void;
}

const FeedCardHeader = ({ participants, handleViewTrip }: Props) => {
  return (
    <div className="FeedCardHeader">
      <FeedCardParticipantsSection participants={participants} />
      <Button variant="warning" onClick={handleViewTrip}>
        View Trip
      </Button>
    </div>
  );
};

export default FeedCardHeader;
