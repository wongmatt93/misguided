import { RiMessage2Fill } from "react-icons/ri";
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
            <CommentCard key={comment.uid + comment.date} comment={comment} />
          ))}
        </ul>
      ) : (
        <div className="empty">
          <RiMessage2Fill />
          <p>Be the first to comment!</p>
        </div>
      )}
    </div>
  );
};

export default TripCommentsContainer;
