import { useEffect, useState } from "react";
import City from "../../../models/City";
import Trip from "../../../models/Trip";
import "./FeedCardLocation.css";

interface Props {
  trip: Trip;
  city: City;
}

const FeedCardLocation = ({ trip, city }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(new Date(trip.date1));
    setEndDate(new Date(trip.date2));
  }, [trip]);

  return (
    <>
      {startDate && endDate && (
        <div className="FeedCardLocation">
          <p className="location">{city.cityName}</p>
          <p className="date">
            {new Date(trip.date1).toLocaleDateString()}
            {trip.date1 !== trip.date2 &&
              ` - ${new Date(trip.date2).toLocaleDateString()}`}
          </p>
        </div>
      )}
    </>
  );
};

export default FeedCardLocation;
