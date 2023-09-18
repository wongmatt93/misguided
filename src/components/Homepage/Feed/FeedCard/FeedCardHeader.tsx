import { Button } from "react-bootstrap";

import { Participant } from "../../../../models/Trip";
import "./FeedCardHeader.css";
import FeedCardParticipantCard from "./FeedCardParticipantCard";

interface Props {
  participants: Participant[];
  handleViewTrip: () => void;
}

const FeedCardHeader = ({ participants, handleViewTrip }: Props) => {
  return (
    <div className="FeedCardHeader">
      <ul className="participants-section">
        {participants.map((participant) => (
          <FeedCardParticipantCard
            key={participant.user.uid}
            user={participant.user}
          />
        ))}
      </ul>
      <Button variant="warning" onClick={handleViewTrip}>
        View Trip
      </Button>
    </div>
  );
};

export default FeedCardHeader;
