import { Tooltip, OverlayTrigger } from "react-bootstrap/";
import { useNavigate } from "react-router-dom";

import { UserSummary } from "../../../../../models/UserProfile";
import "./VisitorCard.css";

interface Props {
  visitor: UserSummary;
}

const VisitorCard = ({ visitor }: Props) => {
  // functions
  const navigate = useNavigate();

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip className="tooltip">{visitor.username}</Tooltip>}
    >
      <li
        className="VisitorCard"
        onClick={() => navigate(`/explorers/profile/${visitor.uid}`)}
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
