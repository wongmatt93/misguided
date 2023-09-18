import { Route, Routes } from "react-router-dom";
import { Trip } from "../../../models/Trip";
import { UserSummary } from "../../../models/UserProfile";
import TripDetails from "../TripDetails/TripDetails";
import ExplorerProfilePage from "./ExplorerProfile/ExplorerProfilePage";
import "./Explorers.css";
import ExplorersMain from "./ExplorersMain/ExplorersMain";

interface Props {
  uid: string;
  username: string;
  upcomingTrips: Trip[];
  followings: UserSummary[];
  followers: UserSummary[];
  refreshProfile: () => Promise<void>;
}

const Explorers = ({
  uid,
  username,
  upcomingTrips,
  followings,
  followers,
  refreshProfile,
}: Props) => {
  return (
    <section className="Explorers">
      <Routes>
        <Route
          index
          element={
            <ExplorersMain
              uid={uid}
              username={username!}
              followings={followings}
              followers={followers}
              refreshProfile={refreshProfile}
            />
          }
        />
        <Route
          path="profile/:uid"
          element={
            <ExplorerProfilePage uid={uid} refreshProfile={refreshProfile} />
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

export default Explorers;
