import { useContext, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import TripContext from "../../../context/TripContext";
import { Trip } from "../../../models/Trip";
import { UserSummary } from "../../../models/UserProfile";
import { deleteTrip } from "../../../services/tripServices";
import { getCurrentDateString } from "../../../utils/dateFunctions";
import GallerySection from "./Gallery/GallerySection";
import ItinerarySection from "./Itinerary/ItinerarySection";
import ParticipantsSection from "./Participants/ParticipantsSection";
import "./TripDetails.css";
import TripNotFound from "./TripNotFound";

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
  const { trip, participants, loading, setLoading, refreshTrip } =
    useContext(TripContext);
  const tripId: string | undefined = useParams().tripId;
  const navigate: NavigateFunction = useNavigate();
  const tripStarted: boolean =
    Number(getCurrentDateString) >= Number(trip?.startDate);

  // functions
  const handleDeleteTrip = async (tripId: string): Promise<void> => {
    await deleteTrip(tripId);
    await refreshProfile();
    navigate("/trips");
  };

  useEffect(() => {
    setLoading(true);
    tripId && refreshTrip(tripId).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  return (
    <section className="TripDetails">
      {!loading ? (
        tripId && trip ? (
          <>
            <div className="full-details-section">
              <ParticipantsSection
                uid={uid}
                upcomingTrips={upcomingTrips}
                followers={followers}
                followings={followings}
                refreshProfile={refreshProfile}
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
        ) : (
          <TripNotFound />
        )
      ) : (
        <div className="generating-block">
          <Spinner />
          <p>Loading Trip...</p>
        </div>
      )}
    </section>
  );
};

export default TripDetails;
