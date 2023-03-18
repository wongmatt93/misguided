import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Trip from "../../models/Trip";
import { deleteTrip } from "../../services/tripServices";
import { deleteUserTrip, getUserByUid } from "../../services/userService";

import "./TripDetailsMain.css";
import UserProfile, { UserTrip } from "../../models/UserProfile";
import GallerySection from "./Gallery/GallerySection";
import ParticipantsSection from "./Participants/ParticipantsSection";
import ItinerarySection from "./Itinerary/ItinerarySection";

interface Props {
  trip: Trip;
  cityName: string;
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
  refreshTrip: (tripId: string) => Promise<void>;
  timesUp: boolean;
}

const TripDetailsMain = ({
  trip,
  cityName,
  userProfile,
  refreshProfile,
  refreshTrip,
  timesUp,
}: Props) => {
  const navigate = useNavigate();

  const [participants, setParticipants] = useState<UserProfile[]>([]);

  useEffect(() => {
    Promise.all(
      trip.participantsUids.map(async (uid) => await getUserByUid(uid))
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
        trip!.participantsUids.map((uid) => deleteUserTrip(uid, trip._id!))
      ),
    ]);
    refreshProfile();
    navigate("/trips");
  };

  return (
    <section
      className="TripDetailsMain"
      style={{ display: timesUp ? "flex" : "none" }}
    >
      {trip.completed && (
        <GallerySection
          userProfile={userProfile}
          refreshProfile={refreshProfile}
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
    </section>
  );
};

export default TripDetailsMain;
