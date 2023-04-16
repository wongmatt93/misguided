import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RiMore2Line, RiDeleteBin5Fill } from "react-icons/ri";
import AuthContext from "../../context/AuthContext";
import useProfileFetcher from "../../hooks/useProfileFetcher";
import useTimer from "../../hooks/useTimer";
import Trip, { Comment } from "../../models/Trip";
import UserProfile from "../../models/UserProfile";
import { deleteCommentFromTrip } from "../../utils/tripFunctions";
import "./CommentCard.css";

interface Props {
  trip: Trip;
  comment: Comment;
  refreshTrip: () => Promise<void>;
}

const CommentCard = ({ trip, comment, refreshTrip }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const commentor: UserProfile | null = useProfileFetcher(comment.uid);
  const [active, setActive] = useState(false);
  const timesUp = useTimer(600);
  const navigate = useNavigate();

  const handleCardClick = () => {
    active && setActive(false);
  };

  const handleDelete = async () => {
    await deleteCommentFromTrip(trip, comment);
    await refreshTrip();
    await refreshProfile();
  };

  return (
    <>
      {commentor && timesUp && (
        <li className="CommentCard">
          <div
            className="total-container"
            style={{
              left: active ? "-3.5em" : "0",
            }}
            onClick={handleCardClick}
          >
            <img
              className="commentor-image circle-image"
              src={commentor.photoURL!}
              alt={commentor.photoURL!}
              onClick={() => navigate(`/profile/${commentor.uid}`)}
            />
            <div className="name-comment-container">
              <h2 onClick={() => navigate(`/profile/${commentor.uid}`)}>
                {commentor.username}
              </h2>
              <p className="comment">{comment.comment}</p>
              <p className="date-time">
                {new Date(Number(comment.date)).toLocaleString()}
              </p>
            </div>
            <RiMore2Line
              style={{
                display: userProfile?.uid === comment.uid ? "block" : "none",
              }}
              className="show-delete-button"
              onClick={() => setActive(!active)}
            />
          </div>
          <Button
            className="delete-button"
            variant="danger"
            onClick={handleDelete}
          >
            <RiDeleteBin5Fill />
          </Button>
        </li>
      )}
    </>
  );
};

export default CommentCard;
