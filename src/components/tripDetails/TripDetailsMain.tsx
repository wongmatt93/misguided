import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Trip from "../../models/Trip";
import {
  deleteTrip,
  removeParticipantFromTrip,
} from "../../services/tripServices";
import { deleteUserTrip, getUserByUid } from "../../services/userService";

import "./TripDetailsMain.css";
import UserProfile, { UserTrip } from "../../models/UserProfile";
import GallerySection from "./Gallery/GallerySection";
import ParticipantsSection from "./Participants/ParticipantsSection";
import ItinerarySection from "./Itinerary/ItinerarySection";
import { today } from "../../utils/dateFunctions";

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
  const tripStarted: boolean = Number(today) >= Number(trip.startDate);

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

      if (tripStarted) {
        setParticipants(accepted);
        notAccepted.forEach((user) => {
          deleteUserTrip(user.uid, trip._id!);
          removeParticipantFromTrip(trip._id!, user.uid);
          refreshTrip(trip._id!);
        });
      } else {
        setParticipants(accepted.concat(notAccepted));
      }
    });
  }, [trip, tripStarted, refreshTrip]);

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
      <ParticipantsSection
        trip={trip}
        userProfile={userProfile}
        participants={participants}
        refreshTrip={refreshTrip}
      />
      {tripStarted && (
        <GallerySection
          userProfile={userProfile}
          refreshProfile={refreshProfile}
          trip={trip}
          participants={participants}
        />
      )}
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
