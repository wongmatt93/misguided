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
import MobileNavigation from "./components/mobileNavigation/MobileNavigation";
import TripsPage from "./components/trips/TripsPage";
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
import InboxPage from "./components/inbox/InboxPage";
import TripMessageThreadPage from "./components/tripMessageThread/TripMessageThreadPage";
import MobileHeader from "./components/Headers/MobileHeaders/MobileHeader";

function App() {
  const { userProfile } = useContext(AuthContext);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <div className="App">
      <Router>
        {userProfile && (isDesktop ? <Header /> : <MobileHeader />)}
        <main>
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
                <Route path="/trips/*" element={<TripsPage />} />
                <Route path="/rating/:cityId/*" element={<RatingPage />} />
                <Route path="plan-trip/*" element={<PlanningRouter />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route
                  path="/city-details/:cityId"
                  element={<CityDetailsPage />}
                />
                <Route path="/inbox/*" element={<InboxPage />} />
                <Route
                  path="/thread/:tripId"
                  element={<TripMessageThreadPage />}
                />
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
        {userProfile && !isDesktop && <MobileNavigation />}
      </Router>
    </div>
  );
}

export default App;
