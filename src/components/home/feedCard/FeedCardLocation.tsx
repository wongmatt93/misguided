import { useEffect, useState } from "react";
import Trip from "../../../models/Trip";
import "./FeedCardLocation.css";

interface Props {
  trip: Trip;
}

const FeedCardLocation = ({ trip }: Props) => {
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
          <p className="location">{trip.cityName}</p>
          <p className="date">
            {startDate.toLocaleDateString()}
            {trip.date1 !== trip.date2 && ` - ${endDate.toLocaleDateString()}`}
          </p>
        </div>
      )}
    </>
  );
};

export default FeedCardLocation;
