import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useProfileFetcher from "../../hooks/useProfileFetcher";
import { Message } from "../../models/Trip";
import UserProfile from "../../models/UserProfile";
import { timeStamp } from "../../utils/dateFunctions";
import "./TripMessage.css";

interface Props {
  message: Message;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const TripMessage = ({ message, setCount }: Props) => {
  const { userProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const author: UserProfile | null = useProfileFetcher(message.uid);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (author) {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      setCount((oldValue) => oldValue + 1);
    }
  }, [author, setCount]);

  const handleClick = (): void => navigate(`/profile/${author!.uid}`);

  return (
    <>
      {author && userProfile && (
        <li
          className={`TripMessage ${
            author.uid === userProfile.uid && `user-profile`
          }`}
        >
          <img
            src={author.photoURL!}
            alt={author.photoURL!}
            className="circle-image"
            onClick={handleClick}
          />
          <div className="content">
            <h3 className="author" onClick={handleClick}>
              {author.username}
            </h3>
            <p>{message.text}</p>
            <p className="date">{timeStamp(message.date)}</p>
          </div>
        </li>
      )}
    </>
  );
};

export default TripMessage;
