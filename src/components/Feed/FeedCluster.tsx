import UserProfile from "../../models/UserProfile";
import FeedCard from "./FeedCard/FeedCard";

interface Props {
  tripIds: string[];
  userProfile: UserProfile;
}

const FeedCluster = ({ tripIds, userProfile }: Props) => {
  return (
    <>
      {tripIds.map((tripId) => (
        <FeedCard key={tripId} tripId={tripId} userProfile={userProfile} />
      ))}
    </>
  );
};

export default FeedCluster;
