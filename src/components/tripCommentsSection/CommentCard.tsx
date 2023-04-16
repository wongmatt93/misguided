import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
  const { refreshProfile } = useContext(AuthContext);
  const commentor: UserProfile | null = useProfileFetcher(comment.uid);
  const timesUp = useTimer(600);
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteCommentFromTrip(trip, comment);
    await refreshTrip();
    await refreshProfile();
  };

  return (
    <>
      {commentor && timesUp && (
        <li className="CommentCard">
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
          <Button type="button" onClick={handleDelete}>
            delete
          </Button>
        </li>
      )}
    </>
  );
};

export default CommentCard;
