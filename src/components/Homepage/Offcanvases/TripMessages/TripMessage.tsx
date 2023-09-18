import { useNavigate } from "react-router-dom";
import { Message, Participant } from "../../../../models/Trip";
import { timeStamp } from "../../../../utils/dateFunctions";
import "./TripMessage.css";

interface Props {
  uid: string;
  message: Message;
  participants: Participant[];
}

const TripMessage = ({ uid, message, participants }: Props) => {
  // variables
  const navigate = useNavigate();
  const author: Participant = participants.find(
    (participant) => participant.user.uid === message.uid
  )!;
  const { uid: authorUid, username, photoURL } = author.user;

  // functions
  const handleClick = (): void => navigate(`/explorers/profile/${authorUid}`);

  return (
    <li className={`TripMessage ${authorUid === uid && `user-profile`}`}>
      <img src={photoURL!} alt={photoURL!} onClick={handleClick} />
      <div className="content">
        <h3 className="author" onClick={handleClick}>
          {username}
        </h3>
        <p>{message.text}</p>
        <p className="date">{timeStamp(message.date)}</p>
      </div>
    </li>
  );
};

export default TripMessage;
