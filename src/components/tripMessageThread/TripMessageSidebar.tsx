import { useNavigate } from "react-router-dom";
import { Participant } from "../../models/Trip";
import "./TripMessageSidebar.css";

interface Props {
  tripParticipants: Participant[];
}

const TripMessageSidebar = ({ tripParticipants }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="TripMessageSidebar">
      <h3>Participants</h3>
      <ul>
        {tripParticipants.map((participant) => (
          <li
            key={participant.uid}
            className="participant"
            onClick={() => navigate(`/profile/${participant.uid}`)}
          >
            <img
              className="circle-image"
              src={participant.profile!.photoURL!}
              alt={participant.profile!.photoURL!}
            />
            <p>{participant.profile!.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripMessageSidebar;
