import { useNavigate } from "react-router-dom";
import useCityFetcher from "../../hooks/useCityFetcher";
import City from "../../models/City";
import Trip from "../../models/Trip";
import "./TripMessageHeaderDesktop.css";

interface Props {
  trip: Trip;
}

const TripMessageHeaderDesktop = ({ trip }: Props) => {
  const navigate = useNavigate();
  const city: City | null = useCityFetcher(trip.cityId);

  const handleClick = (): void => navigate(`/trips/trip-details/${trip._id!}`);

  return (
    <div className="TripMessageHeaderDesktop">
      {city && (
        <h2 onClick={handleClick}>
          {trip.nickname
            ? trip.nickname.toLowerCase()
            : city.cityName.toLowerCase()}
        </h2>
      )}
    </div>
  );
};

export default TripMessageHeaderDesktop;
