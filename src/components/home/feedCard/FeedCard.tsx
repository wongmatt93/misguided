import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Trip from "../../../models/Trip";
import "./FeedCard.css";
import FeedCardHeader from "./FeedCardHeader";
import FriendCardPhotoCarousel from "./FriendCardPhotoCarousel";
import FeedCardParticipantsSection from "./FeedCardParticipantsSection";
import PlaceholderCard from "./PlaceholderCard";
import FeedCardInteractions from "./FeedCardInteractions";
import FeedCardLocation from "./FeedCardLocation";

interface Props {
  trip: Trip;
}

const FeedCard = ({ trip }: Props) => {
  const navigate = useNavigate();

  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

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

  return (
    <>
      {fullyLoaded ? (
        <li className="FeedCard">
          <FeedCardHeader trip={trip} />
          <FeedCardLocation trip={trip} />
          <FriendCardPhotoCarousel
            photos={photos}
            handleViewTrip={handleViewTrip}
          />
          <FeedCardInteractions trip={trip} />
        </li>
      ) : (
        <PlaceholderCard />
      )}
    </>
  );
};

export default FeedCard;
