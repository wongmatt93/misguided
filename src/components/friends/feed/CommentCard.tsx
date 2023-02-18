import useGetUserByUid from "../../../hooks/useGetUserByUid";
import { Comment } from "../../../models/Trip";
import UserProfile from "../../../models/UserProfile";
import "./CommentCard.css";

interface Props {
  comment: Comment;
}

const CommentCard = ({ comment }: Props) => {
  const commenter: UserProfile | null = useGetUserByUid(comment.uid);

  return (
    <li className="CommentCard">
      {commenter && (
        <>
          <img
            className="commentor-image"
            src={commenter.photoURL!}
            alt={commenter.photoURL!}
          />
          <h3>{commenter.displayName}</h3>
          <p>{comment.comment}</p>
          <p>{new Date(Number(comment.date)).toLocaleString()}</p>
        </>
      )}
    </li>
  );
};

export default CommentCard;
