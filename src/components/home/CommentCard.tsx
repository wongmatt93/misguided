import useProfileFetcher from "../../hooks/useProfileFetcher";
import { Comment } from "../../models/Trip";
import UserProfile from "../../models/UserProfile";
import "./CommentCard.css";

interface Props {
  comment: Comment;
}

const CommentCard = ({ comment }: Props) => {
  const commentor: UserProfile | null = useProfileFetcher(comment.uid);

  return (
    <li className="CommentCard">
      {commentor && (
        <>
          <img
            className="commentor-image"
            src={commentor.photoURL!}
            alt={commentor.photoURL!}
          />
          <h3>{commentor.displayName}</h3>
          <p>{comment.comment}</p>
          <p>{new Date(Number(comment.date)).toLocaleString()}</p>
        </>
      )}
    </li>
  );
};

export default CommentCard;
