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
import LandingPage from "./components/landingPage/LandingPage";
import DiscoverPage from "./components/discover/DiscoverPage";
import MobileNavigation from "./components/MobileNavigation/MobileNavigation";
import TripsPage from "./components/Trips/TripsPage";
import "./App.css";
import ProfilePage from "./components/profile/ProfilePage";
import CityDetailsPage from "./components/cityDetails/CityDetailsPage";
import InitialSigninPage from "./components/initialSignIn/InitialSignInPage";
import Homepage from "./components/home/Homepage";
import SearchPage from "./components/search/SearchPage";
import { useMediaQuery } from "react-responsive";
import TripRouter from "./components/tripDetails/TripRouter";
import RatingPage from "./components/rating/RatingPage";
import PlanningRouter from "./components/planning/PlanningRouter";
import SettingsRouter from "./components/settings/SettingsRouter";
import InboxPage from "./components/Inbox/InboxPage";
import MobileHeader from "./components/Headers/MobileHeaders/MobileHeader";
import DesktopNavigation from "./components/desktopNavigation/DesktopNavigation";

function App() {
  const { userProfile } = useContext(AuthContext);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <div className="App">
      <Router>
        {userProfile &&
          (isDesktop ? <Header userProfile={userProfile} /> : <MobileHeader />)}
        <main>
          {userProfile && isDesktop && (
            <DesktopNavigation notifications={userProfile.notifications} />
          )}
          <Routes>
            {!userProfile ? (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/profile/:uid" element={<ProfilePage />} />
                <Route
                  path="/trip-details/:tripId/*"
                  element={<TripRouter />}
                />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/routes" element={<InitialSigninPage />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route
                  path="/trips/*"
                  element={<TripsPage userTrips={userProfile.trips} />}
                />
                <Route path="/rating/:cityId/*" element={<RatingPage />} />
                <Route path="plan-trip/*" element={<PlanningRouter />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route
                  path="/city-details/:cityId"
                  element={<CityDetailsPage />}
                />
                <Route path="/inbox/*" element={<InboxPage />} />
                <Route path="/settings/*" element={<SettingsRouter />} />
                <Route path="/profile/:uid" element={<ProfilePage />} />
                <Route
                  path="/trip-details/:tripId/*"
                  element={<TripRouter />}
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
