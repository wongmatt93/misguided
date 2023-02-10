import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Trip from "../../models/Trip";
import { deleteTrip, getTripById } from "../../services/tripServices";
import "./TripDetailsPage.css";
import { Button } from "react-bootstrap";
import { deleteUserTrip, getUserByUid } from "../../services/userService";
import ParticipantsSection from "./participants/ParticipantsSection";
import GallerySection from "./gallery/GallerySection";
import UserProfile from "../../models/UserProfile";
import ItinerarySection from "./itinerary/ItinerarySection";

const TripDetailsPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const tripId: string | undefined = useParams().tripId;
  const navigate = useNavigate();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tripCreator, setTripCreator] = useState(false);
  const [participants, setParticipants] = useState<UserProfile[]>([]);

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

  useEffect(() => {
    if (trip) {
      Promise.all(trip.participants.map((item) => getUserByUid(item.uid))).then(
        (response) => setParticipants(response)
      );
    }
  }, [trip]);

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
          {trip.completed && (
            <GallerySection
              userProfile={userProfile}
              trip={trip}
              participants={participants}
            />
          )}
          <ParticipantsSection
            trip={trip}
            participants={participants}
            setTrip={setTrip}
            tripCreator={tripCreator}
          />
          <ItinerarySection trip={trip} />
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
