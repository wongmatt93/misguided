import { createContext } from "react";
import { Participant, Trip } from "../models/Trip";

interface TripContextModel {
  trip: Trip | null;
  participants: Participant[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refreshTrip: (tripId: string) => Promise<void>;
}

const defaultValues: TripContextModel = {
  trip: null,
  participants: [],
  loading: false,
  setLoading: () => {},
  refreshTrip: async () => {},
};

const TripContext = createContext(defaultValues);

export default TripContext;
