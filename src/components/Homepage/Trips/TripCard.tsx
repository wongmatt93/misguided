import { Button } from "react-bootstrap";
import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Participant, Trip } from "../../../models/Trip";
import { UserSummary } from "../../../models/UserProfile";
import { addVisitor } from "../../../services/cityServices";
import {
  completeTrip,
  deleteTrip,
  removeParticipantFromTrip,
} from "../../../services/tripServices";
import { convertDateStringToText } from "../../../utils/dateFunctions";
import "./TripCard.css";

interface Props {
  refreshProfile: () => Promise<void>;
  trip: Trip;
  pastTrip: boolean;
}

const TripCard = ({ refreshProfile, trip, pastTrip }: Props) => {
  // variables
  const navigate = useNavigate();
  const { _id: tripId, city, startDate, endDate } = trip;
  const { cityName, photoURL } = city;
  const imagePath: string =
    process.env.PUBLIC_URL + `/assets/cities/${photoURL}`;

  // functions
  const handleViewTrip = (): void => navigate(`/trips/trip-details/${tripId!}`);

  const handleCompleteTrip = async (): Promise<void> => {
    await completeTrip(trip._id!);

    const acceptedParticipants: Participant[] = [];
    const unacceptedParticipants: Participant[] = [];

    trip.participants.forEach((participant) => {
      if (participant.accepted) {
        acceptedParticipants.push(participant);
      } else {
        unacceptedParticipants.push(participant);
      }
    });

    acceptedParticipants.forEach((participant) => {
      const match: UserSummary | undefined = city.visitors.find(
        (visitor) => visitor.uid === participant.user.uid
      );
      if (!match) {
        addVisitor(city._id!, participant.user.uid);
      }
    });

    unacceptedParticipants.forEach((participant) => {
      removeParticipantFromTrip(tripId!, participant.user.uid);
    });

    await refreshProfile();
  };

  const handleUnconfirmTrip = async (trip: Trip): Promise<void> => {
    await deleteTrip(trip._id!);
    refreshProfile();
  };

  return (
    <li className="TripCard">
      <div className="trip-information" onClick={handleViewTrip}>
        <img
          className="trip-card-image circle-image"
          src={imagePath}
          alt={cityName}
        />
        <div>
          <h2>{cityName}</h2>
          <h3>
            {convertDateStringToText(startDate)}
            {startDate !== endDate && `- ${convertDateStringToText(endDate)}`}
          </h3>
        </div>
        <RiArrowRightSLine />
      </div>
      {!trip.completed && pastTrip && (
        <div className="confirm-complete-container">
          <p>Was this trip completed?</p>
          <div className="button-container">
            <Button variant="warning" onClick={() => handleCompleteTrip()}>
              Yes
            </Button>
            <Button variant="warning" onClick={() => handleUnconfirmTrip(trip)}>
              No
            </Button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TripCard;
