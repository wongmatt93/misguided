import { useNavigate } from "react-router-dom";
import useCityFetcher from "../../hooks/useCityFetcher";
import City from "../../models/City";
import Trip from "../../models/Trip";
import "./TripMessageThreadHeader.css";

interface Props {
  trip: Trip;
}

const TripMessageThreadHeader = ({ trip }: Props) => {
  const navigate = useNavigate();
  const city: City | null = useCityFetcher(trip.cityId);

  const handleClick = (): void => navigate(`/trip/${trip._id!}`);

  return (
    <>
      {city && (
        <header className="TripMessageThreadHeader" onClick={handleClick}>
          <h1>
            {trip.nickname
              ? trip.nickname.toLowerCase()
              : city.cityName.toLowerCase()}
          </h1>
        </header>
      )}
    </>
  );
};

export default TripMessageThreadHeader;
