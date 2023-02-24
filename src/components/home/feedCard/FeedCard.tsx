import { useEffect, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { useNavigate } from "react-router-dom";
import Trip from "../../../models/Trip";
import "./FeedCard.css";
import FeedCardHeader from "./FeedCardHeader";
import FriendCardPhotoCarousel from "./FriendCardPhotoCarousel";
import FeedCardParticipantsSection from "./FeedCardParticipantsSection";
import PlaceholderCard from "./PlaceholderCard";
import AddCommentForm from "../AddCommentForm";
import CommentsModal from "../CommentsModal";
import FeedCardInteractions from "./FeedCardInteractions";

interface Props {
  trip: Trip;
}

const FeedCard = ({ trip }: Props) => {
  const navigate = useNavigate();

  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

  const [showComments, setShowComments] = useState(false);

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

    setFullyLoaded(true);
  }, [trip]);

  const handleViewTrip = (): void => navigate(`/trip/${trip._id!}`);

  const handleCloseComments = () => setShowComments(false);
  const handleShowComments = () => setShowComments(true);

  return (
    <li className="FeedCard">
      {fullyLoaded ? (
        <div className="post">
          <FeedCardHeader trip={trip} />
          <div className="photos-interactions-container">
            <FriendCardPhotoCarousel
              photos={photos}
              handleViewTrip={handleViewTrip}
            />
            <FeedCardInteractions trip={trip} />
          </div>
          <FeedCardParticipantsSection participants={trip.participants} />
          {/* <div className="likes-comments-buttons">

            <div onClick={() => setOpenComment(!openComment)}>
              <AiOutlineMessage />
              <p>Comment</p>
            </div>
          </div> */}
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
