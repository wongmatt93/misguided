import Trip from "../../../models/Trip";
import UserProfile from "../../../models/UserProfile";
import ProfileTripCard from "./ProfileTripCard";

interface Props {
  trips: Trip[];
  userProfile: UserProfile | undefined;
}

const ProfileTripsCluster = ({ trips, userProfile }: Props) => {
  return (
    <>
      {trips.map((trip) => (
        <ProfileTripCard
          key={trip._id!}
          trip={trip}
          userProfile={userProfile}
        />
      ))}
    </>
  );
};

export default ProfileTripsCluster;
