import { useNavigate } from "react-router-dom";
import useProfileFetcher from "../../hooks/useProfileFetcher";
import useTimer from "../../hooks/useTimer";
import { Comment } from "../../models/Trip";
import UserProfile from "../../models/UserProfile";
import "./CommentCard.css";

interface Props {
  comment: Comment;
}

const CommentCard = ({ comment }: Props) => {
  const commentor: UserProfile | null = useProfileFetcher(comment.uid);
  const timesUp = useTimer(600);
  const navigate = useNavigate();

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
        </li>
      )}
    </>
  );
};

export default CommentCard;
