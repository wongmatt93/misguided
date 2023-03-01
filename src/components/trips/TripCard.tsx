import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useCityFetcher from "../../hooks/useCityFetcher";
import City from "../../models/City";
import Trip from "../../models/Trip";
import "./TripCard.css";

interface Props {
  trip: Trip;
}

const TripCard = ({ trip }: Props) => {
  const navigate = useNavigate();
  const city: City | null = useCityFetcher(trip.cityId);

  const handleClick = (): void => navigate(`/trip/${trip._id!}`);

  return (
    <li className="TripCard" onClick={handleClick}>
      {city && (
        <div className="info-container">
          <img src={city.photoURL} alt={city.photoURL} />
          <div className="name-date-container">
            <h3>{city.cityName}</h3>
            <h4>
              {new Date(Number(trip.startDate)).toLocaleDateString()}
              {trip.startDate !== trip.endDate &&
                ` - ${new Date(Number(trip.endDate)).toLocaleDateString()}`}
            </h4>
          </div>
          <RiArrowRightSLine />
        </div>
      )}
    </li>
  );
};

export default TripCard;
