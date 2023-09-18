import { useState } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import { Comment } from "../../../../models/Trip";
import { UserSummary } from "../../../../models/UserProfile";
import { addLikesUid, removeLikesUid } from "../../../../services/tripServices";

import "./FeedCardInteractions.css";
import TripCommentsOffcanvas from "./TripCommentsOffcanvas";

interface Props {
  uid: string;
  tripId: string;
  nickname: string;
  likes: UserSummary[];
  comments: Comment[];
  cityName: string;
  refreshFeedTrips: () => Promise<void>;
}

const FeedCardInteractions = ({
  uid,
  tripId,
  nickname,
  likes,
  comments,
  cityName,
  refreshFeedTrips,
}: Props) => {
  // variables
  const [show, setShow] = useState(false);
  const [liked, setLiked] = useState<boolean>(
    likes.some((like) => like.uid === uid)
  );
  const [likesCount, setLikesCount] = useState<number>(likes.length);

  // functions
  const handleLikeTrip = async (): Promise<void> => {
    await addLikesUid(tripId, uid);
    setLiked(true);
    setLikesCount(likesCount + 1);
  };
  const handleUnlikeTrip = async (): Promise<void> => {
    await removeLikesUid(tripId, uid);
    setLiked(false);
    setLikesCount(likesCount - 1);
  };

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  return (
    <div className="FeedCardInteractions">
      <div className="likes">
        {liked ? (
          <AiFillHeart onClick={handleUnlikeTrip} />
        ) : (
          <AiOutlineHeart onClick={handleLikeTrip} />
        )}
        <p>{likesCount}</p>
      </div>
      <div className="comments">
        <AiOutlineMessage onClick={handleShow} />
        <p>{comments.length}</p>
      </div>
      <TripCommentsOffcanvas
        uid={uid}
        tripId={tripId}
        nickname={nickname}
        comments={comments}
        cityName={cityName}
        refreshFeedTrips={refreshFeedTrips}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export default FeedCardInteractions;
