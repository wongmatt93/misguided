import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullTrip from "../../../models/Trip";
import "./FeedCard.css";
import FeedCardHeader from "./FeedCardHeader";
import FriendCardPhotoCarousel from "./FriendCardPhotoCarousel";
import FeedCardInteractions from "./FeedCardInteractions";
import FeedCardLocation from "./FeedCardLocation";
import FullUserProfile from "../../../models/UserProfile";
import { getFullTripById } from "../../../services/tripServices";
import useTimer from "../../../hooks/useTimer";

interface Props {
  tripId: string;
  userProfile: FullUserProfile;
}

const FeedCard = ({ tripId, userProfile }: Props) => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState<FullTrip | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const { uid, pastTrips } = userProfile;
  const timesUp: boolean = useTimer(1000);

  const refreshTrip = (tripId: string): Promise<void> =>
    getFullTripById(tripId).then((trip) => {
      setTrip(trip);
    });

  useEffect(() => {
    refreshTrip(tripId);
  }, [tripId]);

  useEffect(() => {
    if (trip) {
      if (trip.photos.length > 0) {
        if (trip.photos.length > 5) {
          setPhotos([...trip.photos.splice(0, 5), "excess"]);
        } else {
          setPhotos(trip.photos);
        }
      } else {
        setPhotos([trip.city.photoURL]);
      }
    }
  }, [trip]);

  const handleViewTrip = (): void =>
    pastTrips.some((pastTrip) => pastTrip._id! === tripId)
      ? navigate(`/trips/trip-details/${tripId}`)
      : navigate(`/feed/trip-details/${tripId}`);

  return (
    <>
      {trip && timesUp && (
        <li className="FeedCard">
          <FeedCardHeader
            participants={trip.participants}
            handleViewTrip={handleViewTrip}
          />
          <FeedCardLocation
            city={trip.city}
            startDate={trip.startDate}
            endDate={trip.endDate}
          />
          <FriendCardPhotoCarousel
            photos={photos}
            handleViewTrip={handleViewTrip}
          />
          <FeedCardInteractions
            trip={trip}
            refreshTrip={() => refreshTrip(tripId)}
            uid={uid}
          />
        </li>
      )}
    </>
  );
};

export default FeedCard;
