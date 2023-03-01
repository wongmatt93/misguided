import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCityFetcher from "../../hooks/useCityFetcher";
import City from "../../models/City";
import Trip from "../../models/Trip";
import "./ProfileTripCard.css";

interface Props {
  trip: Trip;
}

const ProfileTripCard = ({ trip }: Props) => {
  const navigate = useNavigate();
  const city: City | null = useCityFetcher(trip.cityId);
  const [cardImage, setCardImage] = useState("");

  useEffect(() => {
    if (city) {
      if (trip.photos.length > 0) {
        setCardImage(trip.photos[0]);
      } else {
        setCardImage(city.photoURL);
      }
    }
  }, [city, trip]);

  const handleClick = (): void => navigate(`/trip/${trip._id!}`);

  return (
    <>
      {city && (
        <li className="ProfileTripCard" onClick={handleClick}>
          <img src={cardImage} alt={cardImage} />
          <div className="info-container">
            <h4>{city.cityName}</h4>
          </div>
        </li>
      )}
    </>
  );
};

export default ProfileTripCard;
