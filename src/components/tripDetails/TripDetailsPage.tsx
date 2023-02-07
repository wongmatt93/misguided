import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Trip from "../../models/Trip";
import { deleteTrip, getTripById } from "../../services/tripServices";
import "./TripDetailsPage.css";
import { Button } from "react-bootstrap";
import { deleteUserTrip } from "../../services/userService";
import ParticipantsSection from "./ParticipantsSection";
import TripAccordion from "./TripAccordion";

const TripDetailsPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const tripId: string | undefined = useParams().tripId;
  const navigate = useNavigate();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tripCreator, setTripCreator] = useState(false);

  useEffect(() => {
    if (tripId) {
      getTripById(tripId).then((response) => {
        setTrip(response);
        setStartDate(new Date(response.date1));
        setEndDate(new Date(response.date2));

        if (userProfile) {
          if (userProfile.uid === response.creatorUid) {
            setTripCreator(true);
          }
        }
      });
    }
  }, [userProfile, tripId]);

  const handleDeleteTrip = (): Promise<void> =>
    deleteTrip(tripId!).then(() => {
      Promise.all(
        trip!.participants.map((item) => deleteUserTrip(item.uid, tripId!))
      )
        .then(() => refreshProfile(userProfile!.uid))
        .then(() => navigate("/trips"));
    });

  return (
    <main className="TripDetailsPage">
      {trip && startDate && endDate && (
        <>
          <h2>{trip.cityName}</h2>
          <h3>
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </h3>
          <ParticipantsSection
            trip={trip}
            setTrip={setTrip}
            tripCreator={tripCreator}
          />
          <TripAccordion trip={trip} />
          {tripCreator && (
            <Button
              className="delete-button"
              variant="link"
              onClick={handleDeleteTrip}
            >
              Delete Trip
            </Button>
          )}
        </>
      )}
    </main>
  );
};

export default TripDetailsPage;
