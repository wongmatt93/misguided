import { useEffect, useState } from "react";
import { BsChevronCompactRight } from "react-icons/bs";
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
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(new Date(trip.date1));
    setEndDate(new Date(trip.date2));
  }, [trip]);

  const handleClick = (): void => navigate(`/trip/${trip._id!}`);

  return (
    <li className="TripCard" onClick={handleClick}>
      {startDate && endDate && city && (
        <div className="info-container">
          <img src={city.photoURL} alt={city.photoURL} />
          <div className="name-date-container">
            <h3>{city.cityName}</h3>
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
