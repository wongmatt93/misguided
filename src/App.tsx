import { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "./context/AuthContext";
import Header from "./components/Headers/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import DiscoverPage from "./components/Discover/DiscoverPage";
import MobileNavigation from "./components/MobileNavigation/MobileNavigation";
import TripsPage from "./components/Trips/TripsPage";
import "./App.css";
import ProfilePage from "./components/Profile/ProfilePage";
import CityDetailsPage from "./components/CityDetails/CityDetailsPage";
import InitialSigninPage from "./components/initialSignIn/InitialSignInPage";
import { useMediaQuery } from "react-responsive";
import PlanningRouter from "./components/Planning/PlanningRouter";
import SettingsRouter from "./components/Settings/SettingsRouter";
import InboxPage from "./components/Inbox/InboxPage";
import MobileHeader from "./components/Headers/MobileHeaders/MobileHeader";
import DesktopNavigation from "./components/DesktopNavigation/DesktopNavigation";
import LandingHeader from "./components/LandingPage/LandingHeader";
import TripDetailsPage from "./components/TripDetails/TripDetailsPage";
import FeedRouter from "./components/Feed/FeedRouter";
import ExplorersRouter from "./components/Explorers/ExplorersRouter";

function App() {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <div className="App">
      <Router>
        {userProfile ? (
          isDesktop ? (
            <Header userProfile={userProfile} />
          ) : (
            <MobileHeader />
          )
        ) : (
          <LandingHeader />
        )}
        <main>
          {userProfile && isDesktop && (
            <DesktopNavigation notifications={userProfile.notifications} />
          )}
          <Routes>
            {!userProfile ? (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/profile/:uid" element={<ProfilePage />} />
                <Route path="/search/profile/:uid" element={<ProfilePage />} />
                <Route
                  path="/explorers/profile/:uid"
                  element={<ProfilePage />}
                />
                <Route
                  path="/trip-details/:tripId/"
                  element={<TripDetailsPage />}
                />
                <Route
                  path="/feed/trip-details/:tripId/"
                  element={<TripDetailsPage />}
                />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route
                  path="/routes"
                  element={
                    <InitialSigninPage
                      userProfile={userProfile}
                      refreshProfile={refreshProfile}
                    />
                  }
                />
                <Route
                  path="/feed/*"
                  element={<FeedRouter userProfile={userProfile} />}
                />
                <Route
                  path="/explorers/*"
                  element={<ExplorersRouter userProfile={userProfile} />}
                />
                <Route
                  path="/trips/*"
                  element={<TripsPage userTrips={userProfile.trips} />}
                />
                <Route
                  path="/plan-trip/*"
                  element={
                    <PlanningRouter
                      userProfile={userProfile}
                      refreshProfile={refreshProfile}
                    />
                  }
                />
                <Route
                  path="/discover"
                  element={
                    <DiscoverPage
                      userProfile={userProfile}
                      refreshProfile={refreshProfile}
                    />
                  }
                />
                <Route
                  path="/city-details/:cityId"
                  element={
                    <CityDetailsPage
                      userProfile={userProfile}
                      refreshProfile={refreshProfile}
                    />
                  }
                />
                <Route
                  path="/inbox/*"
                  element={
                    <InboxPage
                      userProfile={userProfile}
                      refreshProfile={refreshProfile}
                    />
                  }
                />
                <Route
                  path="/settings/*"
                  element={
                    <SettingsRouter
                      userProfile={userProfile}
                      refreshProfile={refreshProfile}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/routes" />} />
              </>
            )}
          </Routes>
        </main>
        {userProfile && !isDesktop && (
          <MobileNavigation notifications={userProfile.notifications} />
        )}
      </Router>
    </div>
  );
}

export default App;
