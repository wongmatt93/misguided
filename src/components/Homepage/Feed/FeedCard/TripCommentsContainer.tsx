import { RiMessage2Fill } from "react-icons/ri";

import { Comment } from "../../../../models/Trip";
import TripCommentCard from "./TripCommentCard";
import "./TripCommentsContainer.css";

interface Props {
  uid: string;
  tripId: string;
  comments: Comment[];
  refreshFeedTrips: () => Promise<void>;
}

const TripCommentsContainer = ({
  uid,
  tripId,
  comments,
  refreshFeedTrips,
}: Props) => {
  return (
    <div className="TripCommentsContainer">
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <TripCommentCard
              key={comment.date + comment.user.uid}
              uid={uid}
              tripId={tripId}
              comment={comment}
              refreshFeedTrips={refreshFeedTrips}
            />
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
