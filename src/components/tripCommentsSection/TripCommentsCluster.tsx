import { Comment } from "../../models/Trip";
import CommentCard from "./CommentCard";
import "./TripCommentsCluster.css";

interface Props {
  comments: Comment[];
}

const TripCommentsCluster = ({ comments }: Props) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentCard key={comment.uid + comment.date} comment={comment} />
      ))}
    </>
  );
};

export default TripCommentsCluster;
