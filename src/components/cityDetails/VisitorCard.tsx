import { Tooltip, OverlayTrigger } from "react-bootstrap/";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../../models/UserProfile";
import "./VisitorCard.css";

interface Props {
  visitor: UserProfile;
}

const VisitorCard = ({ visitor }: Props) => {
  const navigate = useNavigate();

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip className="tooltip">{visitor.username}</Tooltip>}
    >
      <li
        className="VisitorCard"
        onClick={() => navigate(`/profile/${visitor.uid}`)}
      >
        <img
          src={visitor.photoURL!}
          alt={visitor.photoURL!}
          className="circle-image"
        />
      </li>
    </OverlayTrigger>
  );
};

export default VisitorCard;
