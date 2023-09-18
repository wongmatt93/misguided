import "./FeedCardLocation.css";

interface Props {
  cityName: string;
  startDate: string;
  endDate: string;
}

const FeedCardLocation = ({ cityName, startDate, endDate }: Props) => {
  return (
    <div className="FeedCardLocation">
      <p className="location">{cityName}</p>
      <p className="date">
        {new Date(Number(startDate)).toLocaleDateString()}
        {startDate !== endDate &&
          ` - ${new Date(Number(endDate)).toLocaleDateString()}`}
      </p>
    </div>
  );
};

export default FeedCardLocation;
