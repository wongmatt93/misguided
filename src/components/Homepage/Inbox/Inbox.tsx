import { Route, Routes } from "react-router-dom";
import { UserProfile } from "../../../models/UserProfile";
import TripDetails from "../TripDetails/TripDetails";

import "./Inbox.css";
import InboxMain from "./InboxMain";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const Inbox = ({ userProfile, refreshProfile }: Props) => {
  // variables
  const { uid, upcomingTrips, followers, followings } = userProfile;

  return (
    <section className="Inbox">
      <Routes>
        <Route
          index
          element={
            <InboxMain
              userProfile={userProfile}
              refreshProfile={refreshProfile}
            />
          }
        />
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

export default Inbox;
