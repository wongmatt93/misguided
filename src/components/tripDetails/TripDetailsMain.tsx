import { Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Trip from "../../models/Trip";
import { deleteTrip } from "../../services/tripServices";
import { deleteUserTrip, getUserByUid } from "../../services/userService";
import GallerySection from "./gallery/GallerySection";
import ItinerarySection from "./itinerary/ItinerarySection";
import ParticipantsSection from "./participants/ParticipantsSection";
import "./TripDetailsMain.css";
import UserProfile, { UserTrip } from "../../models/UserProfile";

interface Props {
  trip: Trip;
  cityName: string;
  userProfile: UserProfile | undefined;
  refreshTrip: (tripId: string) => Promise<void>;
}

const TripDetailsMain = ({
  trip,
  cityName,
  userProfile,
  refreshTrip,
}: Props) => {
  const { refreshProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [participants, setParticipants] = useState<UserProfile[]>([]);

  useEffect(() => {
    Promise.all(
      trip.participants.map(async (item) => await getUserByUid(item.uid))
    ).then((response) => {
      const accepted: UserProfile[] = [];
      const notAccepted: UserProfile[] = [];

      response.forEach((user) => {
        const match: UserTrip | undefined = user.trips.find(
          (userTrip) => userTrip.tripId === trip._id!
        );
        if (match) {
          if (match.accepted) {
            accepted.push(user);
          } else {
            notAccepted.push(user);
          }
        }
      });

      setParticipants(accepted.concat(notAccepted));
    });
  }, [trip]);

  const handleDeleteTrip = async (): Promise<void> => {
    await Promise.allSettled([
      deleteTrip(trip._id!),
      Promise.allSettled(
        trip!.participants.map((item) => deleteUserTrip(item.uid, trip._id!))
      ),
    ]);
    refreshProfile(userProfile!.uid);
    navigate("/trips");
  };

  return (
    <main className="TripDetailsMain">
      {trip.completed && (
        <GallerySection
          userProfile={userProfile}
          trip={trip}
          participants={participants}
        />
      )}
      <ParticipantsSection
        trip={trip}
        userProfile={userProfile}
        participants={participants}
        refreshTrip={refreshTrip}
      />
      <ItinerarySection trip={trip} cityName={cityName} />
      {userProfile && trip.creatorUid === userProfile.uid && (
        <Button
          className="delete-button"
          variant="link"
          onClick={handleDeleteTrip}
        >
          Delete Trip
        </Button>
      )}
    </main>
  );
};

export default TripDetailsMain;
