import { useEffect, useState } from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { UserTrip } from "../../models/UserProfile";
import "./TripCard.css";

interface Props {
  trip: UserTrip;
}

const TripCard = ({ trip }: Props) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(new Date(trip.date1));
    setEndDate(new Date(trip.date2));
  }, [trip]);

  const handleClick = (): void => navigate(`/trip/${trip.tripId}`);

  return (
    <li className="TripCard" onClick={handleClick}>
      {startDate && endDate && (
        <div className="info-container">
          <img src={trip.cityPhotoURL} alt={trip.cityPhotoURL} />
          <div className="name-date-container">
            <h3>{trip.cityName}</h3>
            <h4>
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
            </h4>
          </div>
          <BsChevronCompactRight />
        </div>
      )}
    </li>
  );
};

export default TripCard;
