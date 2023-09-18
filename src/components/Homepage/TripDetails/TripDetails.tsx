import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

import { Participant, Trip } from "../../../models/Trip";
import { UserSummary } from "../../../models/UserProfile";
import { deleteTrip, getFullTripById } from "../../../services/tripServices";
import { getCurrentDateString } from "../../../utils/dateFunctions";
import GallerySection from "./Gallery/GallerySection";
import ItinerarySection from "./Itinerary/ItinerarySection";
import ParticipantsSection from "./Participants/ParticipantsSection";
import "./TripDetails.css";

interface Props {
  uid: string;
  upcomingTrips: Trip[];
  followers: UserSummary[];
  followings: UserSummary[];
  refreshProfile: () => Promise<void>;
}

const TripDetails = ({
  uid,
  upcomingTrips,
  followers,
  followings,
  refreshProfile,
}: Props) => {
  // variables
  const tripId: string | undefined = useParams().tripId;
  const navigate: NavigateFunction = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const tripStarted: boolean =
    Number(getCurrentDateString) >= Number(trip?.startDate);

  // functions
  const refreshTrip = async (tripId: string): Promise<void> => {
    const updatedTrip = await getFullTripById(tripId);
    setTrip(updatedTrip);
    const accepted: Participant[] = updatedTrip.participants.filter(
      (participant) => participant.accepted
    );
    const notAccepted: Participant[] = updatedTrip.participants.filter(
      (participant) => !participant.accepted
    );

    setParticipants(accepted.concat(notAccepted));
  };

  const handleDeleteTrip = async (tripId: string): Promise<void> => {
    await deleteTrip(tripId);
    await refreshProfile();
    navigate("/trips");
  };

  useEffect(() => {
    if (tripId) {
      refreshTrip(tripId);
    }
  }, [tripId]);

  return (
    <section className="TripDetails">
      {tripId && trip && (
        <>
          <div className="full-details-section">
            <ParticipantsSection
              uid={uid}
              upcomingTrips={upcomingTrips}
              followers={followers}
              followings={followings}
              tripId={tripId}
              creator={trip.creator}
              participants={participants}
              startDate={trip.startDate}
              endDate={trip.endDate}
              refreshTrip={() => refreshTrip(tripId)}
            />
            {tripStarted && (
              <GallerySection
                uid={uid}
                tripId={tripId}
                participants={participants}
                photos={trip.photos}
                refreshTrip={() => refreshTrip(tripId)}
              />
            )}
            <ItinerarySection
              cityName={trip.city.cityName}
              startDate={trip.startDate}
              endDate={trip.endDate}
              hotel={trip.hotel}
              schedule={trip.schedule}
            />
          </div>
          {trip.creator.uid === uid && (
            <Button
              className="delete-button"
              variant="link"
              onClick={() => handleDeleteTrip(tripId)}
            >
              Delete Trip
            </Button>
          )}
        </>
      )}
    </section>
  );
};

export default TripDetails;
