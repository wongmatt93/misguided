import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../../models/UserProfile";
import { getAllUsersByUidArray } from "../../services/userService";
import "./TripMessageSidebar.css";

interface Props {
  participantsUids: string[];
}

const TripMessageSidebar = ({ participantsUids }: Props) => {
  const [participants, setParticipants] = useState<UserProfile[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsersByUidArray(participantsUids).then((response) =>
      setParticipants(response)
    );
  }, [participantsUids]);

  return (
    <div className="TripMessageSidebar">
      <h3>Participants</h3>
      <ul>
        {participants.map((participant) => (
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
