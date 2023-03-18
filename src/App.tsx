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
import DiscoverPage from "./components/discover/DiscoverPage";
import MobileNavigation from "./components/MobileNavigation/MobileNavigation";
import TripsPage from "./components/Trips/TripsPage";
import "./App.css";
import ProfilePage from "./components/Profile/ProfilePage";
import CityDetailsPage from "./components/cityDetails/CityDetailsPage";
import InitialSigninPage from "./components/initialSignIn/InitialSignInPage";
import FeedPage from "./components/Feed/FeedPage";
import { useMediaQuery } from "react-responsive";
import RatingPage from "./components/rating/RatingPage";
import PlanningRouter from "./components/planning/PlanningRouter";
import SettingsRouter from "./components/Settings/SettingsRouter";
import InboxPage from "./components/Inbox/InboxPage";
import MobileHeader from "./components/Headers/MobileHeaders/MobileHeader";
import DesktopNavigation from "./components/DesktopNavigation/DesktopNavigation";
import LandingHeader from "./components/LandingPage/LandingHeader";
import SearchRouter from "./components/Search/SearchRouter";
import TripDetailsPage from "./components/tripDetails/TripDetailsPage";

function App() {
  const { userProfile } = useContext(AuthContext);
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
                  path="/trip-details/:tripId/*"
                  element={<TripDetailsPage />}
                />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/routes" element={<InitialSigninPage />} />
                <Route
                  path="/feed"
                  element={<FeedPage userProfile={userProfile} />}
                />
                <Route
                  path="/search/*"
                  element={<SearchRouter userProfile={userProfile} />}
                />
                <Route
                  path="/trips/*"
                  element={<TripsPage userTrips={userProfile.trips} />}
                />
                <Route path="/rating/:cityId/*" element={<RatingPage />} />
                <Route path="/plan-trip/*" element={<PlanningRouter />} />
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
                  element={<TripDetailsPage />}
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
