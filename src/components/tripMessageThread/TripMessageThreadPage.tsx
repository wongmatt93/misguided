import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Trip from "../../models/Trip";
import { getTripById } from "../../services/tripServices";
import NewMessageForm from "./NewMessageForm";
import TripMessagesContainer from "./TripMessagesContainer";
import TripMessageSidebar from "./TripMessageSidebar";
import "./TripMessageThreadPage.css";
import TripMessageHeaderDesktop from "./TripMessageHeaderDesktop";

interface Props {
  userUid: string;
}

const TripMessageThreadPage = ({ userUid }: Props) => {
  const tripId: string | undefined = useParams().tripId;
  const [trip, setTrip] = useState<Trip | null>(null);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  const refreshTrip = async (tripId: string): Promise<void> =>
    setTrip(await getTripById(tripId));

  useEffect(() => {
    tripId && refreshTrip(tripId);
  }, [tripId]);

  useEffect(() => {
    if (trip) {
      const interval = setInterval(() => {
        getTripById(trip._id!).then((response) => {
          const item1: string = response.messages.toString();
          const item2: string = trip.messages.toString();

          if (item1 !== item2) {
            setTrip(response);
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [trip]);

  return (
    <>
      {trip && (
        <section className="TripMessageThreadPage">
          <div className="TripMessageThread">
            {isDesktop && <TripMessageHeaderDesktop trip={trip} />}
            <TripMessagesContainer trip={trip} userUid={userUid} />
            <NewMessageForm
              tripId={trip._id!}
              userUid={userUid}
              refreshTrip={refreshTrip}
            />
          </div>
          {isLargeScreen && (
            <TripMessageSidebar tripParticipants={trip.participants} />
          )}
        </section>
      )}
    </>
  );
};

export default TripMessageThreadPage;
