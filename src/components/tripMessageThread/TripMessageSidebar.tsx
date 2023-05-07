import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Participant } from "../../models/Trip";
import { UserProfile } from "../../models/UserProfile";
import { getAllUsersByUidArray } from "../../services/userService";
import "./TripMessageSidebar.css";

interface Props {
  tripParticipants: Participant[];
}

const TripMessageSidebar = ({ tripParticipants }: Props) => {
  const [participantsProfiles, setParticipantsProfiles] = useState<
    UserProfile[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    const participantsUids: string[] = tripParticipants.map((item) => item.uid);
    getAllUsersByUidArray(participantsUids).then((response) =>
      setParticipantsProfiles(response)
    );
  }, [tripParticipants]);

  return (
    <div className="TripMessageSidebar">
      <h3>Participants</h3>
      <ul>
        {participantsProfiles.map((participant) => (
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
