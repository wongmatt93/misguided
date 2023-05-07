import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Trip from "../../../models/Trip";
import {
  deleteTrip,
  removeParticipantFromTrip,
} from "../../../services/tripServices";
import { getUserByUid } from "../../../services/userService";

import "./TripDetailsMain.css";
import ActiveUserProfile, { UserProfile } from "../../../models/UserProfile";
import GallerySection from "./Gallery/GallerySection";
import ParticipantsSection from "./Participants/ParticipantsSection";
import ItinerarySection from "./Itinerary/ItinerarySection";
import { today } from "../../../utils/dateFunctions";

interface Props {
  trip: Trip;
  cityName: string;
  userProfile: ActiveUserProfile;
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
    const accepted: UserProfile[] = [];
    const notAccepted: UserProfile[] = [];

    Promise.allSettled(
      trip.participants.map((participant) =>
        participant.accepted
          ? getUserByUid(participant.uid).then((profile) => {
              accepted.push(profile);
            })
          : getUserByUid(participant.uid).then((profile) => {
              notAccepted.push(profile);
            })
      )
    ).then(() => {
      if (tripStarted) {
        setParticipants(accepted);
        notAccepted.forEach((user) => {
          removeParticipantFromTrip(trip._id!, user.uid);
          refreshTrip(trip._id!);
        });
      } else {
        setParticipants(accepted.concat(notAccepted));
      }
    });
  }, [trip, tripStarted, refreshTrip]);

  const handleDeleteTrip = async (): Promise<void> => {
    await deleteTrip(trip._id!);
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
