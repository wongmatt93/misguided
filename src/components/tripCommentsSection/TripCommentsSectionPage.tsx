import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Trip from "../../models/Trip";
import { getTripById } from "../../services/tripServices";
import AddCommentForm from "./AddCommentForm";
import TripCommentsContainer from "./TripCommentsContainer";
import "./TripCommentsSectionPage.css";

const TripCommentsSectionPage = () => {
  const tripId: string | undefined = useParams().tripId;
  const [trip, setTrip] = useState<Trip | null>(null);

  const refreshTrip = (tripId: string): Promise<void> =>
    getTripById(tripId).then((response) => setTrip(response));

  useEffect(() => {
    if (tripId) {
      refreshTrip(tripId);
    }
  }, [tripId]);

  return (
    <>
      {trip && (
        <section className="TripCommentsSectionPage">
          <TripCommentsContainer trip={trip} />
          <AddCommentForm trip={trip} refreshTrip={refreshTrip} />
        </section>
      )}
    </>
  );
};

export default TripCommentsSectionPage;
