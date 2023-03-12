import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import Trip from "../../../models/Trip";
import { likeTrip, unlikeTrip } from "../../../services/tripServices";
import "./FeedCardInteractions.css";
import { useNavigate } from "react-router-dom";

interface Props {
  trip: Trip;
}

const FeedCardInteractions = ({ trip }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likesQuantity, setLikesQuantity] = useState(0);
  const [commentsQuantity, setCommentsQuantity] = useState(0);

  useEffect(() => {
    userProfile && trip.likesUids.some((uid) => uid === userProfile.uid)
      ? setLiked(true)
      : setLiked(false);

    setLikesQuantity(trip.likesUids.length);
    setCommentsQuantity(trip.comments.length);
  }, [trip, userProfile]);

  const handleLikeTrip = (): Promise<string | void> =>
    likeTrip(trip._id!, userProfile!.uid).then(() => refreshProfile());

  const handleUnlikeTrip = (): Promise<void> =>
    unlikeTrip(trip._id!, userProfile!.uid).then(() => refreshProfile());

  return (
    <div className="FeedCardInteractions">
      <div className="likes">
        {liked ? (
          <AiFillHeart onClick={handleUnlikeTrip} />
        ) : (
          <AiOutlineHeart onClick={handleLikeTrip} />
        )}
        <p>{likesQuantity}</p>
      </div>
      <div className="comments">
        <AiOutlineMessage
          onClick={() => navigate(`/trip-details/${trip._id!}/comments`)}
        />
        <p>{commentsQuantity}</p>
      </div>
    </div>
  );
};

export default FeedCardInteractions;
