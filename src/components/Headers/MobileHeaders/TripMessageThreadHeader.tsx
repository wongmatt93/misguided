import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullTrip from "../../../models/Trip";
import { getFullTripById } from "../../../services/tripServices";
import "./TripMessageThreadHeader.css";

interface Props {
  path: string;
}

const TripMessageThreadHeader = ({ path }: Props) => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState<FullTrip | null>(null);

  useEffect(() => {
    if (path.includes("thread")) {
      getFullTripById(path.split("thread/")[1]).then((response) => {
        setTrip(response);
      });
    }
  }, [path]);

  const handleClick = (): void => navigate(`/trips/trip-details/${trip!._id!}`);

  return (
    <>
      {trip && (
        <div className="TripMessageThreadHeader MobileHeaderDiv">
          <h1 onClick={handleClick}>
            {trip.nickname
              ? trip.nickname.toLowerCase()
              : trip.city.cityName.toLowerCase()}
          </h1>
        </div>
      )}
    </>
  );
};

export default TripMessageThreadHeader;
