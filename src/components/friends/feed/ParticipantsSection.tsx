import { Participant } from "../../../models/Trip";
import ParticipantCard from "./ParticipantCard";
import "./ParticipantsSection.css";

interface Props {
  participants: Participant[];
}

const ParticipantsSection = ({ participants }: Props) => {
  return (
    <section className="ParticipantsSection">
      <h4>Participants</h4>
      <ul>
        {participants.map((participant) => (
          <ParticipantCard participant={participant} />
        ))}
      </ul>
    </section>
  );
};

export default ParticipantsSection;
