import { useNavigate } from "react-router-dom";
import Trip from "../../models/Trip";
import "./TripMessageThreadHeader.css";

interface Props {
  trip: Trip;
}

const TripMessageThreadHeader = ({ trip }: Props) => {
  const navigate = useNavigate();

  const handleClick = (): void => navigate(`/trip/${trip._id!}`);

  return (
    <header className="TripMessageThreadHeader" onClick={handleClick}>
      <h1>
        {trip.cityName}: {trip.date1}
        {trip.date1 !== trip.date2 && ` - ${trip.date2}`}
      </h1>
    </header>
  );
};

export default TripMessageThreadHeader;
