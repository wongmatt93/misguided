import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Trip } from "../../../models/Trip";
import { convertDateStringToText } from "../../../utils/dateFunctions";
import "./TripCard.css";

interface Props {
  trip: Trip;
}

const TripCard = ({ trip }: Props) => {
  // variables
  const navigate = useNavigate();
  const { city, startDate, endDate } = trip;
  const { cityName, photoURL } = city;
  const imagePath: string =
    process.env.PUBLIC_URL + `/assets/cities/${photoURL}`;

  // functions
  const handleViewTrip = (): void =>
    navigate(`/trips/trip-details/${trip._id!}`);

  return (
    <li className="TripCard" onClick={handleViewTrip}>
      <img
        className="trip-card-image circle-image"
        src={imagePath}
        alt={cityName}
      />
      <div>
        <h2>{cityName}</h2>
        <h3>
          {convertDateStringToText(startDate)}
          {startDate !== endDate && `- ${convertDateStringToText(endDate)}`}
        </h3>
      </div>
      <RiArrowRightSLine />
    </li>
  );
};

export default TripCard;
