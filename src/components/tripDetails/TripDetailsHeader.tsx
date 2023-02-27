import { useEffect, useState } from "react";
import useCityFetcher from "../../hooks/useCityFetcher";
import City from "../../models/City";
import Trip from "../../models/Trip";
import "./TripDetailsHeader.css";

interface Props {
  trip: Trip;
}

const TripDetailsHeader = ({ trip }: Props) => {
  const city: City | null = useCityFetcher(trip.cityId);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(new Date(trip.date1));
    setEndDate(new Date(trip.date2));
  }, [trip]);

  return (
    <>
      {startDate && endDate && city && (
        <header className="TripDetailsHeader">
          <h1>{city.cityName}</h1>
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
