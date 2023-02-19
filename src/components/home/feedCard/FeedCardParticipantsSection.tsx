import { Participant } from "../../../models/Trip";
import FeedCardParticipantCard from "./FeedCardParticipantCard";
import "./FeedCardParticipantsSection.css";

interface Props {
  participants: Participant[];
}

const FeedCardParticipantsSection = ({ participants }: Props) => {
  return (
    <section className="FeedCardParticipantsSection">
      <h4>Participants</h4>
      <ul>
        {participants.map((participant) => (
          <FeedCardParticipantCard
            key={participant.uid}
            participant={participant}
          />
        ))}
      </ul>
    </section>
  );
};

export default FeedCardParticipantsSection;
