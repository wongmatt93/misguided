import { useNavigate } from "react-router-dom";
import { RiMore2Line, RiDeleteBin5Fill } from "react-icons/ri";
import { Button } from "react-bootstrap";

import { useState } from "react";
import { Comment } from "../../../../models/Trip";
import "./TripCommentCard.css";
import { removeCommentFromTrip } from "../../../../services/tripServices";

interface Props {
  uid: string;
  tripId: string;
  comment: Comment;
  refreshFeedTrips: () => Promise<void>;
}

const TripCommentCard = ({ uid, tripId, comment, refreshFeedTrips }: Props) => {
  // variables
  const [active, setActive] = useState(false);
  const { user, comment: tripComment, date } = comment;
  const navigate = useNavigate();

  // functions
  const handleCardClick = () => {
    active && setActive(false);
  };

  const handleDelete = async () => {
    await removeCommentFromTrip(tripId, user.uid, date, tripComment);
    await refreshFeedTrips();
  };

  return (
    <li className="TripCommentCard">
      <div
        className="total-container"
        style={{
          left: active ? "-3.5em" : "0",
        }}
        onClick={handleCardClick}
      >
        <img
          className="commentor-image circle-image"
          src={user.photoURL!}
          alt={user.photoURL!}
          onClick={() => navigate(`/explorers/profile/${user.uid}`)}
        />
        <div className="name-comment-container">
          <h2 onClick={() => navigate(`/profile/${user.uid}`)}>
            {user.username}
          </h2>
          <p className="comment">{comment.comment}</p>
          <p className="date-time">
            {new Date(Number(comment.date)).toLocaleString()}
          </p>
        </div>
        <RiMore2Line
          style={{
            display: uid === user.uid ? "block" : "none",
          }}
          className="show-delete-button"
          onClick={() => setActive(!active)}
        />
      </div>
      <Button className="delete-button" variant="danger" onClick={handleDelete}>
        <RiDeleteBin5Fill />
      </Button>
    </li>
  );
};

export default TripCommentCard;
