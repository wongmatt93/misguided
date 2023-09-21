import { Navigate, Route, Routes } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Footer from "./Footer/Footer";
import Header from "./Headers/DesktopHeader";
import "./Homepage.css";
import Feed from "./Feed/Feed";
import Sidebar from "./Sidebar/Sidebar";
import Planning from "./Planning/Planning";
import Trips from "./Trips/Trips";
import Inbox from "./Inbox/Inbox";
import { UserProfile } from "../../models/UserProfile";
import Explorers from "./Explorers/Explorers";
import MobileHeader from "./Headers/MobileHeaders/MobileHeader";

interface Props {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  refreshProfile: () => Promise<void>;
}

const Homepage = ({ userProfile, setUserProfile, refreshProfile }: Props) => {
  // variables
  const {
    uid,
    username,
    followings,
    followers,
    hometownId,
    favoriteCityIds,
    hiddenCityIds,
    upcomingTrips,
    pastTrips,
    notifications,
  } = userProfile;
  const isMobile: boolean = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="Homepage">
      {isMobile ? (
        <MobileHeader
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          refreshProfile={refreshProfile}
        />
      ) : (
        <Header
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          refreshProfile={refreshProfile}
        />
      )}
      <main>
        <Sidebar notifications={notifications} />
        <Routes>
          <Route
            path="/feed/*"
            element={
              <Feed userProfile={userProfile} refreshProfile={refreshProfile} />
            }
          />
          <Route
            path="/explorers/*"
            element={
              <Explorers
                uid={uid}
                username={username!}
                upcomingTrips={upcomingTrips}
                followings={followings}
                followers={followers}
                refreshProfile={refreshProfile}
              />
            }
          />
          <Route
            path="/planning"
            element={
              <Planning
                hometownId={hometownId!}
                favoriteCityIds={favoriteCityIds}
                hiddenCityIds={hiddenCityIds}
              />
            }
          />
          <Route
            path="/trips/*"
            element={
              <Trips
                uid={uid}
                upcomingTrips={upcomingTrips}
                pastTrips={pastTrips}
                followers={followers}
                followings={followings}
                refreshProfile={refreshProfile}
              />
            }
          />
          <Route
            path="/inbox/*"
            element={
              <Inbox
                userProfile={userProfile}
                refreshProfile={refreshProfile}
              />
            }
          />
          <Route path="*" element={<Navigate to="/feed" />} />
        </Routes>
      </main>
      <Footer notifications={notifications} />
    </div>
  );
};

export default Homepage;
