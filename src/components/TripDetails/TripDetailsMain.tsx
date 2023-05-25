import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullTrip, { Participant } from "../../models/Trip";
import {
  deleteTrip,
  removeParticipantFromTrip,
} from "../../services/tripServices";

import "./TripDetailsMain.css";
import FullUserProfile from "../../models/UserProfile";
import GallerySection from "./Gallery/GallerySection";
import ParticipantsSection from "./Participants/ParticipantsSection";
import ItinerarySection from "./Itinerary/ItinerarySection";
import { today } from "../../utils/dateFunctions";

interface Props {
  trip: FullTrip;
  userProfile: FullUserProfile;
  refreshProfile: () => Promise<void>;
  refreshTrip: (tripId: string) => Promise<void>;
  timesUp: boolean;
}

const TripDetailsMain = ({
  trip,
  userProfile,
  refreshProfile,
  refreshTrip,
  timesUp,
}: Props) => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const tripStarted: boolean = Number(today) >= Number(trip.startDate);

  useEffect(() => {
    const accepted: Participant[] = trip.participants.filter(
      (participant) => participant.accepted
    );
    const notAccepted: Participant[] = trip.participants.filter(
      (participant) => !participant.accepted
    );

    if (tripStarted) {
      setParticipants(accepted);
      notAccepted.forEach((user) => {
        removeParticipantFromTrip(trip._id!, user.uid);
        refreshTrip(trip._id!);
      });
    } else {
      setParticipants(accepted.concat(notAccepted));
    }
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
      <ItinerarySection trip={trip} />
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
