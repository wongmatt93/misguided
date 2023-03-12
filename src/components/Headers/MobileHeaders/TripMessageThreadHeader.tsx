import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import City from "../../../models/City";
import Trip from "../../../models/Trip";
import { getCityById } from "../../../services/cityService";
import { getTripById } from "../../../services/tripServices";
import "./TripMessageThreadHeader.css";

interface Props {
  path: string;
}

const TripMessageThreadHeader = ({ path }: Props) => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [city, setCity] = useState<City | null>(null);

  useEffect(() => {
    if (path.includes("thread")) {
      getTripById(path.slice(8)).then((response) => {
        setTrip(response);
        getCityById(response.cityId).then((response) => setCity(response));
      });
    }
  }, [path]);

  const handleClick = (): void => navigate(`/trip/${trip!._id!}`);

  return (
    <>
      {city && trip && (
        <header className="TripMessageThreadHeader" onClick={handleClick}>
          <h1>
            {trip.nickname
              ? trip.nickname.toLowerCase()
              : city.cityName.toLowerCase()}
          </h1>
        </header>
      )}
    </>
  );
};

export default TripMessageThreadHeader;
