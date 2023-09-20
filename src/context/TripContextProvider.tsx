import { ReactNode, useState } from "react";
import { Participant, Trip } from "../models/Trip";
import { getFullTripById } from "../services/tripServices";
import TripContext from "./TripContext";

interface Props {
  children: ReactNode;
}

const TripContextProvider = ({ children }: Props) => {
  // hooks
  const [trip, setTrip] = useState<Trip | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshTrip = async (tripId: string): Promise<void> => {
    const trip = await getFullTripById(tripId);

    if (trip) {
      setTrip(trip);

      if (trip) {
        const accepted: Participant[] = trip.participants.filter(
          (participant) => participant.accepted
        );
        const notAccepted: Participant[] = trip.participants.filter(
          (participant) => !participant.accepted
        );

        setParticipants(accepted.concat(notAccepted));
      }
    }
  };

  return (
    <TripContext.Provider
      value={{ trip, participants, loading, setLoading, refreshTrip }}
    >
      {children}
    </TripContext.Provider>
  );
};

export default TripContextProvider;
