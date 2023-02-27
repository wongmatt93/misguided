import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BsChevronCompactRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useCityFetcher from "../../hooks/useCityFetcher";
import City from "../../models/City";
import Trip from "../../models/Trip";
import { Notification } from "../../models/UserProfile";
import { completeTrip, deleteTrip } from "../../services/tripServices";
import { addNotification } from "../../services/userService";
import { createRatingNotif } from "../../utils/notificationsFunctions";
import "./PastTripCard.css";

interface Props {
  trip: Trip;
}

const PastTripCard = ({ trip }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const city: City | null = useCityFetcher(trip.cityId);
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

  const handleCompleteTrip = async (): Promise<void> => {
    await completeTrip(trip._id!);

    const newNotification: Notification = createRatingNotif(
      userProfile!.uid,
      trip._id!
    );

    Promise.allSettled(
      trip.participants
        .filter((participant) => participant.uid !== userProfile!.uid)
        .map((participant) => addNotification(participant.uid, newNotification))
    );

    if (city && userProfile) {
      const firstVisit: boolean = !city.ratings.some(
        (user) => user.uid === userProfile!.uid
      );
      if (firstVisit) {
        navigate(`/rating/${trip.cityId}`);
      } else {
        navigate(`/rating/${trip.cityId}/subsequent`);
      }
    }

    refreshProfile(userProfile!.uid);
  };

  return (
    <>
      {startDate && endDate && city && (
        <li className="PastTripCard">
          <div className="info-container" onClick={handleViewTrip}>
            <img src={city.photoURL} alt={city.photoURL} />
            <div className="name-date-container">
              <h3>{city.cityName}</h3>
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
        </li>
      )}
    </>
  );
};

export default PastTripCard;
