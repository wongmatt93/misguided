import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import { useEffect, useState } from "react";
import Trip from "../../../models/Trip";
import "./FeedCardInteractions.css";
import ActiveUserProfile from "../../../models/UserProfile";
import TripCommentsOffcanvas from "../../TripCommentsSection/TripCommentsOffcanvas";
import { addLikesUid, removeLikesUid } from "../../../services/tripServices";

interface Props {
  trip: Trip;
  userProfile: ActiveUserProfile;
  refreshTrip: () => Promise<void>;
}

const FeedCardInteractions = ({ trip, userProfile, refreshTrip }: Props) => {
  const [liked, setLiked] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    trip.likesUids.some((uid) => uid === userProfile.uid)
      ? setLiked(true)
      : setLiked(false);
  }, [trip, userProfile]);

  const handleLikeTrip = (): Promise<string | void> =>
    addLikesUid(trip._id!, userProfile.uid).then(() => refreshTrip());

  const handleUnlikeTrip = (): Promise<void> =>
    removeLikesUid(trip._id!, userProfile.uid).then(() => refreshTrip());

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
        <p>{trip.likesUids.length}</p>
      </div>
      <div className="comments">
        <AiOutlineMessage onClick={handleShow} />
        <p>{trip.comments.length}</p>
      </div>
      <TripCommentsOffcanvas
        trip={trip}
        refreshTrip={refreshTrip}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export default FeedCardInteractions;
