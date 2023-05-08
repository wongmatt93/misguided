import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useTimer from "../../../hooks/useTimer";
import Trip from "../../../models/Trip";
import "./TripCard.css";

interface Props {
  trip: Trip;
}

const TripCard = ({ trip }: Props) => {
  const navigate = useNavigate();
  const timesUp = useTimer(600);

  const handleViewTrip = (): void =>
    navigate(`/trips/trip-details/${trip._id!}`);

  return (
    <>
      {timesUp && (
        <li className="TripCard" onClick={handleViewTrip}>
          <div className="info-container">
            <img
              src={trip.city.photoURL}
              alt={trip.city.photoURL}
              className="circle-image"
            />
            <div className="name-date-container">
              <h3>{trip.nickname ? trip.nickname : trip.city.cityName}</h3>
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
