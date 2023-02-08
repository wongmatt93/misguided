import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BsChevronCompactRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Trip from "../../models/Trip";
import { completeTrip, deleteTrip } from "../../services/tripServices";
import "./PastTripCard.css";

interface Props {
  trip: Trip;
}

const PastTripCard = ({ trip }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setStartDate(new Date(trip.date1));
    setEndDate(new Date(trip.date2));
    setCompleted(trip.completed);
  }, [trip]);

  const handleViewTrip = (): void => navigate(`/trip/${trip._id!}`);

  const handleCompleteTrip = (): Promise<void> =>
    completeTrip(trip._id!).then(() => refreshProfile(userProfile!.uid));

  return (
    <li className="PastTripCard">
      {startDate && endDate && (
        <div className="info-card">
          <div className="info-container" onClick={handleViewTrip}>
            <img src={trip.cityPhoto} alt={trip.cityPhoto} />
            <div className="name-date-container">
              <h3>{trip.cityName}</h3>
              <h4>
                {startDate.toLocaleDateString()} -{" "}
                {endDate.toLocaleDateString()}
              </h4>
            </div>
            <BsChevronCompactRight />
          </div>
          {!completed && (
            <div className="confirm-complete-container">
              <p>Was this trip completed?</p>
              <div className="button-container">
                <Button variant="warning" onClick={handleCompleteTrip}>
                  Yes
                </Button>
                <Button variant="warning">No</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default PastTripCard;
