import useCityFetcher from "../../hooks/useCityFetcher";
import City from "../../models/City";
import Trip from "../../models/Trip";
import "./TripDetailsHeader.css";

interface Props {
  trip: Trip;
}

const TripDetailsHeader = ({ trip }: Props) => {
  const city: City | null = useCityFetcher(trip.cityId);

  return (
    <>
      {city && (
        <header className="TripDetailsHeader">
          <h1>{city.cityName.toLowerCase()}</h1>
          <p>
            {new Date(Number(trip.startDate)).toLocaleDateString()}
            {trip.startDate !== trip.endDate &&
              ` - ${new Date(Number(trip.endDate)).toLocaleDateString()}`}
          </p>
        </header>
      )}
    </>
  );
};

export default TripDetailsHeader;
