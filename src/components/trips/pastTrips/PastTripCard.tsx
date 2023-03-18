import { useContext } from "react";
import { Button } from "react-bootstrap";
import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import useCityFetcher from "../../../hooks/useCityFetcher";
import useTimer from "../../../hooks/useTimer";
import City from "../../../models/City";
import Trip from "../../../models/Trip";
import { Notification } from "../../../models/UserProfile";
import { addVisitor } from "../../../services/cityService";
import { completeTrip, deleteTrip } from "../../../services/tripServices";
import { addNotification, deleteUserTrip } from "../../../services/userService";
import { createRatingNotif } from "../../../utils/notificationsFunctions";
import "./PastTripCard.css";

interface Props {
  trip: Trip;
}

const PastTripCard = ({ trip }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const city: City | null = useCityFetcher(trip.cityId);
  const timesUp = useTimer(600);

  const handleViewTrip = (): void =>
    navigate(`/trips/trip-details/${trip._id!}`);

  const handleCompleteTrip = async (
    trip: Trip,
    city: City,
    uid: string
  ): Promise<void> => {
    await completeTrip(trip._id!);

    const match: string | undefined = city.visitorsUids.find(
      (visitor) => visitor === uid
    );

    if (!match) {
      addVisitor(city._id!, uid);
    }

    const newNotification: Notification = createRatingNotif(uid, trip._id!);

    await Promise.allSettled(
      trip.participantsUids
        .filter((participant) => participant !== uid)
        .map((participant) =>
          addNotification(participant, newNotification).then(() => {
            const match: string | undefined = city.visitorsUids.find(
              (visitor) => visitor === participant
            );

            !match && addVisitor(city._id!, participant);
          })
        )
    );

    const firstVisit: boolean = !city.ratings.some((user) => user.uid === uid);
    if (firstVisit) {
      navigate(`/trips/rating/${trip.cityId}`);
    } else {
      navigate(`/trips/rating/${trip.cityId}/subsequent`);
    }

    refreshProfile();
  };

  const handleUnconfirmTrip = async (trip: Trip): Promise<void> => {
    await Promise.allSettled([
      deleteTrip(trip._id!),
      Promise.allSettled(
        trip.participantsUids.map((item) => deleteUserTrip(item, trip._id!))
      ),
    ]);

    refreshProfile();
  };

  return (
    <>
      {city && userProfile && timesUp && (
        <li className="PastTripCard">
          <div className="info-container" onClick={handleViewTrip}>
            <img
              src={city.photoURL}
              alt={city.photoURL}
              className="circle-image"
            />
            <div className="name-date-container">
              <h3>{trip.nickname ? trip.nickname : city.cityName}</h3>
              <h4>
                {new Date(Number(trip.startDate)).toLocaleDateString()}
                {trip.startDate !== trip.endDate &&
                  ` - ${new Date(Number(trip.endDate)).toLocaleDateString()}`}
              </h4>
            </div>
            <RiArrowRightSLine />
          </div>
          {!trip.completed && (
            <div className="confirm-complete-container">
              <p>Was this trip completed?</p>
              <div className="button-container">
                <Button
                  variant="warning"
                  onClick={() =>
                    handleCompleteTrip(trip, city, userProfile.uid)
                  }
                >
                  Yes
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleUnconfirmTrip(trip)}
                >
                  No
                </Button>
              </div>
            </div>
          )}
        </li>
      )}
    </>
  );
};

export default PastTripCard;
