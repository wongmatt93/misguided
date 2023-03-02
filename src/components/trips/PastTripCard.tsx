import { useContext } from "react";
import { Button } from "react-bootstrap";
import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useCityFetcher from "../../hooks/useCityFetcher";
import City, { Visitor } from "../../models/City";
import Trip from "../../models/Trip";
import { Notification } from "../../models/UserProfile";
import { addVisitor } from "../../services/cityService";
import { completeTrip, deleteTrip } from "../../services/tripServices";
import { addNotification, deleteUserTrip } from "../../services/userService";
import { createRatingNotif } from "../../utils/notificationsFunctions";
import "./PastTripCard.css";

interface Props {
  trip: Trip;
}

const PastTripCard = ({ trip }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const city: City | null = useCityFetcher(trip.cityId);
  const navigate = useNavigate();

  const handleViewTrip = (): void => navigate(`/trip/${trip._id!}`);

  const handleCompleteTrip = async (
    trip: Trip,
    city: City,
    uid: string
  ): Promise<void> => {
    await completeTrip(trip._id!);

    const match: Visitor | undefined = city.visitors.find(
      (visitor) => visitor.uid === uid
    );

    if (!match) {
      addVisitor(city._id!, { uid });
    }

    const newNotification: Notification = createRatingNotif(uid, trip._id!);

    await Promise.allSettled(
      trip.participants
        .filter((participant) => participant.uid !== uid)
        .map((participant) =>
          addNotification(participant.uid, newNotification).then(() => {
            const match: Visitor | undefined = city.visitors.find(
              (visitor) => visitor.uid === participant.uid
            );

            !match && addVisitor(city._id!, { uid: participant.uid });
          })
        )
    );

    const firstVisit: boolean = !city.ratings.some((user) => user.uid === uid);
    if (firstVisit) {
      navigate(`/rating/${trip.cityId}`);
    } else {
      navigate(`/rating/${trip.cityId}/subsequent`);
    }

    refreshProfile(uid);
  };

  const handleUnconfirmTrip = async (
    trip: Trip,
    uid: string
  ): Promise<void> => {
    await Promise.allSettled([
      deleteTrip(trip._id!),
      Promise.allSettled(
        trip.participants.map((item) => deleteUserTrip(item.uid, trip._id!))
      ),
    ]);

    refreshProfile(uid);
  };

  return (
    <>
      {city && userProfile && (
        <li className="PastTripCard">
          <div className="info-container" onClick={handleViewTrip}>
            <img src={city.photoURL} alt={city.photoURL} />
            <div className="name-date-container">
              <h3>{city.cityName}</h3>
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
                  onClick={() => handleUnconfirmTrip(trip, userProfile.uid)}
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
