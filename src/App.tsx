import { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "./context/AuthContext";
import Header from "./components/header/Header";
import LandingPage from "./components/landingPage/LandingPage";
import UserProfilePage from "./components/userProfile/UserProfilePage";
import DiscoverPage from "./components/discover/DiscoverPage";
import MobileNavigation from "./components/mobileNavigation/MobileNavigation";
import TripsPage from "./components/trips/TripsPage";
import "./App.css";
import ProfilePage from "./components/profile/ProfilePage";
import AddCityPage from "./components/admin/AddCityPage";
import CityDetailsPage from "./components/cityDetails/CityDetailsPage";
import PreferencesPage from "./components/userProfile/preferences/PreferencesPage";
import PlanningPage from "./components/tripPlanner/PlanningPage";
import TripDetailsPage from "./components/tripDetails/TripDetailsPage";
import AccountInformationPage from "./components/userProfile/accountInformation/AccountInformationPage";
import InitialSigninPage from "./components/initialSignIn/InitialSignInPage";
import Homepage from "./components/home/Homepage";
import SearchPage from "./components/search/SearchPage";
import PlanTripPage from "./components/tripPlanner/PlanTripPage";
import InboxPage from "./components/inbox/InboxPage";
import { useMediaQuery } from "react-responsive";

function App() {
  const { userProfile } = useContext(AuthContext);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <div className="App">
      <Router>
        {userProfile && isDesktop && <Header />}
        <Routes>
          {!userProfile ? (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/profile/:uid" element={<ProfilePage />} />
              <Route path="/trip/:tripId" element={<TripDetailsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/routes" element={<InitialSigninPage />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/preferences" element={<PreferencesPage />} />
              <Route path="/trips/*" element={<TripsPage />} />
              <Route path="plan-trip" element={<PlanTripPage />} />
              <Route path="/plan-trip/:cityId" element={<PlanningPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route
                path="/city-details/:cityId"
                element={<CityDetailsPage />}
              />
              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/user-profile" element={<UserProfilePage />} />
              <Route path="/account" element={<AccountInformationPage />} />
              <Route path="/profile/:uid" element={<ProfilePage />} />
              <Route path="/add-city" element={<AddCityPage />} />
              <Route path="/trip/:tripId" element={<TripDetailsPage />} />
              <Route path="*" element={<Navigate to="/routes" />} />
            </>
          )}
        </Routes>
        {userProfile && !isDesktop && <MobileNavigation />}
      </Router>
    </div>
  );
}

export default App;
