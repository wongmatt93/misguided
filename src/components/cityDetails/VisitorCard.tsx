import { Tooltip, OverlayTrigger } from "react-bootstrap/";
import { useNavigate } from "react-router-dom";
import useProfileFetcher from "../../hooks/useProfileFetcher";
import UserProfile from "../../models/UserProfile";
import "./VisitorCard.css";

interface Props {
  uid: string;
}

const VisitorCard = ({ uid }: Props) => {
  const navigate = useNavigate();
  const user: UserProfile | null = useProfileFetcher(uid);

  return (
    <>
      {user && (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip className="tooltip">{user.username}</Tooltip>}
        >
          <li
            className="VisitorCard"
            onClick={() => navigate(`/profile/${uid}`)}
          >
            <img src={user.photoURL!} alt={user.photoURL!} />
          </li>
        </OverlayTrigger>
      )}
    </>
  );
};

export default VisitorCard;
