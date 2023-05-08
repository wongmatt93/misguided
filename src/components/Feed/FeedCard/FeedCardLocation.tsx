import Trip from "../../../models/Trip";
import "./FeedCardLocation.css";

interface Props {
  trip: Trip;
}

const FeedCardLocation = ({ trip }: Props) => {
  return (
    <div className="FeedCardLocation">
      <p className="location">{trip.city.cityName}</p>
      <p className="date">
        {new Date(Number(trip.startDate)).toLocaleDateString()}
        {trip.startDate !== trip.endDate &&
          ` - ${new Date(Number(trip.endDate)).toLocaleDateString()}`}
      </p>
    </div>
  );
};

export default FeedCardLocation;
