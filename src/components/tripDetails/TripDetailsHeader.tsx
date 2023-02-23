import { useEffect, useState } from "react";
import Trip from "../../models/Trip";
import "./TripDetailsHeader.css";

interface Props {
  trip: Trip;
}

const TripDetailsHeader = ({ trip }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(new Date(trip.date1));
    setEndDate(new Date(trip.date2));
  }, [trip]);

  return (
    <>
      {startDate && endDate && (
        <header className="TripDetailsHeader">
          <h1>{trip.cityName}</h1>
          <p>
            {startDate.toLocaleDateString()}
            {trip.date1 !== trip.date2 && ` - ${endDate.toLocaleDateString()}`}
          </p>
        </header>
      )}
    </>
  );
};

export default TripDetailsHeader;
