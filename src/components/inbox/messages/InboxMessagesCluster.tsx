import Trip from "../../../models/Trip";
import UserProfile from "../../../models/UserProfile";
import InboxMessagesCard from "./InboxMessagesCard";
import "./InboxMessagesCluster.css";

interface Props {
  trips: Trip[];
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const InboxMessagesCluster = ({
  trips,
  userProfile,
  refreshProfile,
}: Props) => {
  return (
    <>
      {trips.map((trip) => (
        <InboxMessagesCard
          key={trip._id!}
          trip={trip}
          userProfile={userProfile}
          refreshProfile={refreshProfile}
        />
      ))}
    </>
  );
};

export default InboxMessagesCluster;
