import Trip, { Comment } from "../../models/Trip";
import CommentCard from "./CommentCard";
import "./TripCommentsCluster.css";

interface Props {
  trip: Trip;
  comments: Comment[];
  refreshTrip: () => Promise<void>;
}

const TripCommentsCluster = ({ trip, comments, refreshTrip }: Props) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentCard
          key={comment.uid + comment.date}
          trip={trip}
          comment={comment}
          refreshTrip={refreshTrip}
        />
      ))}
    </>
  );
};

export default TripCommentsCluster;
