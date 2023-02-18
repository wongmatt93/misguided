import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Trip from "../../../models/Trip";
import UserProfile from "../../../models/UserProfile";
import "./FeedCardHeader.css";
import { getUserByUid } from "../../../services/userService";

interface Props {
  trip: Trip;
}

const FeedCardHeader = ({ trip }: Props) => {
  const navigate = useNavigate();
  const [creator, setCreator] = useState<UserProfile | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    getUserByUid(trip.creatorUid).then((response) => setCreator(response));

    setStartDate(new Date(trip.date1));
    setEndDate(new Date(trip.date2));
  }, [trip]);

  const handleViewProfile = (): void => navigate(`/profile/${creator!.uid}`);

  const handleViewTrip = (): void => navigate(`/trip/${trip._id!}`);

  return (
    <section className="FeedCardHeader">
      {creator && (
        <>
          <div className="image-name-location-container">
            <img
              src={creator.photoURL!}
              alt={creator.photoURL!}
              onClick={handleViewProfile}
            />
            <div className="name-location-container">
              <h3 onClick={handleViewProfile}>{creator.displayName}</h3>
              <div className="city-container">
                <h4>{trip.cityName}</h4>
                <p>
                  {startDate!.toLocaleDateString()} -{" "}
                  {endDate!.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <Button variant="warning" onClick={handleViewTrip}>
            View Trip
          </Button>
        </>
      )}
    </section>
  );
};

export default FeedCardHeader;
