import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Trip from "../../../models/Trip";
import "./FeedCard.css";
import FeedCardHeader from "./FeedCardHeader";
import FriendCardPhotoCarousel from "./FriendCardPhotoCarousel";
import FeedCardInteractions from "./FeedCardInteractions";
import FeedCardLocation from "./FeedCardLocation";
import City from "../../../models/City";
import ActiveUserProfile from "../../../models/UserProfile";
import { getTripById } from "../../../services/tripServices";
import { getCityById } from "../../../services/cityService";
import useTimer from "../../../hooks/useTimer";

interface Props {
  tripId: string;
  userProfile: ActiveUserProfile;
}

const FeedCard = ({ tripId, userProfile }: Props) => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [city, setCity] = useState<City | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const { pastTrips } = userProfile;
  const timesUp: boolean = useTimer(1000);

  const refreshTrip = (tripId: string): Promise<void> =>
    getTripById(tripId).then((trip) => {
      getCityById(trip.cityId).then((city) => setCity(city));
      setTrip(trip);
    });

  useEffect(() => {
    refreshTrip(tripId);
  }, [tripId]);

  useEffect(() => {
    if (city && trip) {
      if (trip.photos.length > 0) {
        if (trip.photos.length > 5) {
          setPhotos([...trip.photos.splice(0, 5), "excess"]);
        } else {
          setPhotos(trip.photos);
        }
      } else {
        setPhotos([city.photoURL]);
      }
    }
  }, [trip, city]);

  const handleViewTrip = (): void => navigate(`/trip-details/${tripId}`);

  return (
    <>
      {city && trip && timesUp && (
        <li className="FeedCard">
          <FeedCardHeader trip={trip} pastTrips={pastTrips} />
          <FeedCardLocation trip={trip} city={city} />
          <FriendCardPhotoCarousel
            photos={photos}
            handleViewTrip={handleViewTrip}
          />
          <FeedCardInteractions
            trip={trip}
            city={city}
            refreshTrip={() => refreshTrip(tripId)}
            userProfile={userProfile}
          />
        </li>
      )}
    </>
  );
};

export default FeedCard;
