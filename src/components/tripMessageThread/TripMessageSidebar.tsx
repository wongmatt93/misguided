import { useNavigate } from "react-router-dom";
import { UserProfile } from "../../models/UserProfile";
import "./TripMessageSidebar.css";

interface Props {
  tripParticipants: UserProfile[];
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
              src={participant.photoURL!}
              alt={participant.photoURL!}
            />
            <p>{participant.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripMessageSidebar;
