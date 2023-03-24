import { useEffect, useState } from "react";
import Trip from "../models/Trip";
import { today } from "../utils/dateFunctions";

const useCurrentTrip = (trip: Trip | null): boolean => {
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    if (trip) {
      if (
        Number(today) >= Number(trip.startDate) &&
        Number(trip.endDate) >= Number(today)
      ) {
        setIsCurrent(true);
      }
    }
  }, [trip]);

  return isCurrent;
};

export default useCurrentTrip;
