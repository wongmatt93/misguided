import City from "../../../models/City";
import Trip from "../../../models/Trip";
import "./FeedCardLocation.css";

interface Props {
  trip: Trip;
  city: City;
}

const FeedCardLocation = ({ trip, city }: Props) => {
  return (
    <div className="FeedCardLocation">
      <p className="location">{city.cityName}</p>
      <p className="date">
        {new Date(Number(trip.startDate)).toLocaleDateString()}
        {trip.startDate !== trip.endDate &&
          ` - ${new Date(Number(trip.endDate)).toLocaleDateString()}`}
      </p>
    </div>
  );
};

export default FeedCardLocation;
