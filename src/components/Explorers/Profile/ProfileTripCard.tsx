import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCityFetcher from "../../../hooks/useCityFetcher";
import useTimer from "../../../hooks/useTimer";
import City from "../../../models/City";
import Trip from "../../../models/Trip";
import UserProfile from "../../../models/UserProfile";
import "./ProfileTripCard.css";

interface Props {
  trip: Trip;
  userProfile: UserProfile | undefined;
}

const ProfileTripCard = ({ trip, userProfile }: Props) => {
  const navigate = useNavigate();
  const city: City | null = useCityFetcher(trip.cityId);
  const [cardImage, setCardImage] = useState("");
  const timesUp: boolean = useTimer(1000);

  useEffect(() => {
    city &&
      (trip.photos.length > 0
        ? setCardImage(trip.photos[0])
        : setCardImage(city.photoURL));
  }, [city, trip]);

  const handleClick = (): void => {
    !userProfile
      ? navigate(`/trip-details/${trip._id!}`)
      : trip.participants.some(
          (participant) => participant.uid === userProfile.uid
        )
      ? navigate(`/trips/trip-details/${trip._id!}`)
      : navigate(`/explorers/trip-details/${trip._id!}`);
  };

  return (
    <>
      {city && timesUp && (
        <li className="ProfileTripCard" onClick={handleClick}>
          <img src={cardImage} alt={cardImage} />
          <div className="info-container">
            <h4>{trip.nickname ? trip.nickname : city.cityName}</h4>
          </div>
        </li>
      )}
    </>
  );
};

export default ProfileTripCard;
