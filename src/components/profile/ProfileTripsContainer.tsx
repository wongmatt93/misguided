import { useEffect, useState } from "react";
import Trip from "../../models/Trip";
import UserProfile from "../../models/UserProfile";
import { getTripsByTripIdArray } from "../../services/tripServices";
import { today } from "../../utils/dateFunctions";
import ProfileTripCard from "./ProfileTripCard";
import "./ProfileTripsContainer.css";

interface Props {
  profile: UserProfile;
  setPastTripsCount: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileTripsContainer = ({ profile, setPastTripsCount }: Props) => {
  const [pastTrips, setPastTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const tripIds: string[] = [];

    profile.trips.forEach((trip) => trip.accepted && tripIds.push(trip.tripId));

    getTripsByTripIdArray(tripIds).then((response) => {
      const past: Trip[] = [];

      response.forEach((item) => {
        if (item.completed) {
          const endDate: Date = new Date(item.date2);

          today.getTime() - endDate.getTime() >= 0 && past.push(item);
        }
      });

      setPastTrips(past);
      setPastTripsCount(past.length);
    });
  }, [profile, setPastTripsCount]);

  return (
    <ul className="ProfileTripsContainer">
      {pastTrips.map((trip) => (
        <ProfileTripCard key={trip._id!} trip={trip} />
      ))}
    </ul>
  );
};

export default ProfileTripsContainer;
