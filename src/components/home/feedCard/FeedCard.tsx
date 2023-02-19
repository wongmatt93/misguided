import { useContext, useEffect, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Trip, { Like } from "../../../models/Trip";
import { likeTrip, unlikeTrip } from "../../../services/tripServices";
import "./FeedCard.css";
import FeedCardHeader from "./FeedCardHeader";
import FriendCardPhotoCarousel from "./FriendCardPhotoCarousel";
import FeedCardParticipantsSection from "./FeedCardParticipantsSection";
import PlaceholderCard from "./PlaceholderCard";
import AddCommentForm from "../AddCommentForm";
import LikesModal from "../LikesModal";
import CommentsModal from "../CommentsModal";

interface Props {
  trip: Trip;
}

const FeedCard = ({ trip }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [liked, setLiked] = useState(false);
  const [likesQuantity, setLikesQuantity] = useState(0);
  const [commentsQuantity, setCommentsQuantity] = useState(0);
  const [showLikes, setShowLikes] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  useEffect(() => {
    if (trip.photos.length > 0) {
      if (trip.photos.length > 5) {
        setPhotos([...trip.photos.splice(0, 5), "excess"]);
      } else {
        setPhotos(trip.photos);
      }
    } else {
      setPhotos([trip.cityPhoto]);
    }

    trip.likes.some((item) => item.uid === userProfile!.uid)
      ? setLiked(true)
      : setLiked(false);

    setLikesQuantity(trip.likes.length);
    setCommentsQuantity(trip.comments.length);
    setFullyLoaded(true);
  }, [userProfile, trip]);

  const handleViewTrip = (): void => navigate(`/trip/${trip._id!}`);

  const handleCloseLikes = () => setShowLikes(false);
  const handleShowLikes = () => setShowLikes(true);
  const handleCloseComments = () => setShowComments(false);
  const handleShowComments = () => setShowComments(true);

  const handleLikeTrip = (): Promise<Like | void> =>
    likeTrip(trip._id!, { uid: userProfile!.uid }).then(() =>
      refreshProfile(userProfile!.uid)
    );

  const handleUnlikeTrip = (): Promise<void> =>
    unlikeTrip(trip._id!, userProfile!.uid).then(() =>
      refreshProfile(userProfile!.uid)
    );

  return (
    <li className="FeedCard">
      {fullyLoaded ? (
        <div className="post">
          <FeedCardHeader trip={trip} />
          <FriendCardPhotoCarousel
            photos={photos}
            handleViewTrip={handleViewTrip}
          />
          <FeedCardParticipantsSection participants={trip.participants} />
          <div className="likes-comments-labels">
            <p onClick={handleShowLikes}>{likesQuantity} likes</p>
            <p onClick={handleShowComments}>{commentsQuantity} comments</p>
          </div>
          <div className="likes-comments-buttons">
            {liked ? (
              <div onClick={handleUnlikeTrip}>
                <AiFillHeart />
                <p>Like</p>
              </div>
            ) : (
              <div onClick={handleLikeTrip}>
                {liked ? <AiFillHeart /> : <AiOutlineHeart />}
                <p>Like</p>
              </div>
            )}
            <div onClick={() => setOpenComment(!openComment)}>
              <AiOutlineMessage />
              <p>Comment</p>
            </div>
          </div>
          <Collapse in={openComment}>
            <div>
              <AddCommentForm trip={trip} />
            </div>
          </Collapse>
          <LikesModal
            show={showLikes}
            handleClose={handleCloseLikes}
            trip={trip}
          />
          <CommentsModal
            show={showComments}
            handleClose={handleCloseComments}
            trip={trip}
          />
        </div>
      ) : (
        <PlaceholderCard />
      )}
    </li>
  );
};

export default FeedCard;
