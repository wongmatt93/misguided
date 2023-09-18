import { Route, Routes } from "react-router-dom";
import { UserProfile } from "../../../models/UserProfile";
import TripDetails from "../TripDetails/TripDetails";

import "./Feed.css";
import FeedMain from "./FeedMain";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const Feed = ({ userProfile, refreshProfile }: Props) => {
  // variables
  const { uid, upcomingTrips, followers, followings } = userProfile;

  return (
    <section className="Feed">
      <Routes>
        <Route index element={<FeedMain userProfile={userProfile} />} />
        <Route
          path="trip-details/:tripId"
          element={
            <TripDetails
              uid={uid}
              upcomingTrips={upcomingTrips}
              followers={followers}
              followings={followings}
              refreshProfile={refreshProfile}
            />
          }
        />
      </Routes>
    </section>
  );
};

export default Feed;
