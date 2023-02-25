import Trip from "../../models/Trip";
import CommentCard from "./CommentCard";
import "./TripCommentsContainer.css";

interface Props {
  trip: Trip;
}

const TripCommentsContainer = ({ trip }: Props) => {
  return (
    <div className="TripCommentsContainer">
      {trip.comments.length > 0 ? (
        <ul>
          {trip.comments.map((comment) => (
            <CommentCard key={comment.uid} comment={comment} />
          ))}
        </ul>
      ) : (
        <p>Be the first to comment!</p>
      )}
    </div>
  );
};

export default TripCommentsContainer;
