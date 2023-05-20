import { Comment } from "../../models/Trip";
import CommentCard from "./CommentCard";
import "./TripCommentsCluster.css";

interface Props {
  tripId: string;
  comments: Comment[];
  refreshTrip: () => Promise<void>;
}

const TripCommentsCluster = ({ tripId, comments, refreshTrip }: Props) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentCard
          key={comment.uid + comment.date}
          tripId={tripId}
          comment={comment}
          refreshTrip={refreshTrip}
        />
      ))}
    </>
  );
};

export default TripCommentsCluster;
