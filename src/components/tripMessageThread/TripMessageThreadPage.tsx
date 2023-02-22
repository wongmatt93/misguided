import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Trip from "../../models/Trip";
import { getTripById } from "../../services/tripServices";
import NewMessageForm from "./NewMessageForm";
import TripMessagesContainer from "./TripMessagesContainer";
import TripMessageThreadHeader from "./TripMessageThreadHeader";
import "./TripMessageThreadPage.css";

const TripMessageThreadPage = () => {
  const tripId: string | undefined = useParams().tripId;
  const [trip, setTrip] = useState<Trip | null>(null);

  const refreshTrip = async (tripId: string): Promise<void> =>
    setTrip(await getTripById(tripId));

  useEffect(() => {
    tripId && refreshTrip(tripId);
  }, [tripId]);

  return (
    <>
      {trip && (
        <>
          <TripMessageThreadHeader trip={trip} />
          <main>
            <TripMessagesContainer trip={trip} />
            <NewMessageForm tripId={trip._id!} refreshTrip={refreshTrip} />
          </main>
        </>
      )}
    </>
  );
};

export default TripMessageThreadPage;
