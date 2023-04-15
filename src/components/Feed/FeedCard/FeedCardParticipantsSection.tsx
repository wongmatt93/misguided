import { Participant } from "../../../models/Trip";
import FeedCardParticipantCard from "./FeedCardParticipantCard";
import "./FeedCardParticipantsSection.css";

interface Props {
  participants: Participant[];
}

const FeedCardParticipantsSection = ({ participants }: Props) => {
  return (
    <ul className="FeedCardParticipantsSection">
      {participants.map((participant) => (
        <FeedCardParticipantCard
          key={participant.uid}
          participant={participant}
        />
      ))}
    </ul>
  );
};

export default FeedCardParticipantsSection;
