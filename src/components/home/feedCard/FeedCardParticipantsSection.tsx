import FeedCardParticipantCard from "./FeedCardParticipantCard";
import "./FeedCardParticipantsSection.css";

interface Props {
  participants: string[];
}

const FeedCardParticipantsSection = ({ participants }: Props) => {
  return (
    <ul className="FeedCardParticipantsSection">
      {participants.map((participant) => (
        <FeedCardParticipantCard key={participant} participant={participant} />
      ))}
    </ul>
  );
};

export default FeedCardParticipantsSection;
