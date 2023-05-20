import City from "../../../models/City";
import "./FeedCardLocation.css";

interface Props {
  city: City;
  startDate: string;
  endDate: string;
}

const FeedCardLocation = ({ city, startDate, endDate }: Props) => {
  return (
    <div className="FeedCardLocation">
      <p className="location">{city.cityName}</p>
      <p className="date">
        {new Date(Number(startDate)).toLocaleDateString()}
        {startDate !== endDate &&
          ` - ${new Date(Number(endDate)).toLocaleDateString()}`}
      </p>
    </div>
  );
};

export default FeedCardLocation;
