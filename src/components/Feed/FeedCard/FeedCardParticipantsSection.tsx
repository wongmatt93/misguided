import { UserProfile } from "../../../models/UserProfile";
import FeedCardParticipantCard from "./FeedCardParticipantCard";
import "./FeedCardParticipantsSection.css";

interface Props {
  participants: UserProfile[];
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
