import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useCityFetcher from "../../../hooks/useCityFetcher";
import useTimer from "../../../hooks/useTimer";
import City from "../../../models/City";
import { Trip } from "../../../models/Trip";
import "./TripCard.css";

interface Props {
  trip: Trip;
}

const TripCard = ({ trip }: Props) => {
  const city: City | null = useCityFetcher(trip.cityId);
  const navigate = useNavigate();
  const timesUp = useTimer(600);

  const handleViewTrip = (): void =>
    navigate(`/trips/trip-details/${trip._id!}`);

  return (
    <>
      {timesUp && city && (
        <li className="TripCard" onClick={handleViewTrip}>
          <div className="info-container">
            <img
              src={city.photoURL}
              alt={city.photoURL}
              className="circle-image"
            />
            <div className="name-date-container">
              <h3>{trip.nickname ? trip.nickname : city.cityName}</h3>
              <h4>
                {new Date(Number(trip.startDate)).toLocaleDateString()}
                {trip.startDate !== trip.endDate &&
                  ` - ${new Date(Number(trip.endDate)).toLocaleDateString()}`}
              </h4>
            </div>
            <RiArrowRightSLine />
          </div>
        </li>
      )}
    </>
  );
};

export default TripCard;
