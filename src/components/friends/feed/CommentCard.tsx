import { useEffect, useState } from "react";
import { Comment } from "../../../models/Trip";
import UserProfile from "../../../models/UserProfile";
import { getUserByUid } from "../../../services/userService";
import "./CommentCard.css";

interface Props {
  comment: Comment;
}

const CommentCard = ({ comment }: Props) => {
  const [commenter, setCommenter] = useState<UserProfile | null>(null);

  useEffect(() => {
    getUserByUid(comment.uid).then((response) => setCommenter(response));
  }, [comment]);

  return (
    <li className="CommentCard">
      {commenter && (
        <>
          <img src={commenter.photoURL!} alt={commenter.photoURL!} />
          <h3>{commenter.displayName}</h3>
          <p>{comment.comment}</p>
          <p>{new Date(Number(comment.date)).toLocaleString()}</p>
        </>
      )}
    </li>
  );
};

export default CommentCard;
