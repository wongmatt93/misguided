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
import LikesPage from "./components/likes/LikesPage";
import UserProfilePage from "./components/userProfile/UserProfilePage";
import DiscoverPage from "./components/discover/DiscoverPage";
import FriendsPage from "./components/friends/FriendsPage";
import MobileNavigation from "./components/mobileNavigation/MobileNavigation";
import TripsPage from "./components/trips/TripsPage";
import "./App.css";
import ProfilePage from "./components/profile/ProfilePage";
import AddCityPage from "./components/admin/AddCityPage";
import CityDetailsPage from "./components/cityDetails/CityDetailsPage";
import PreferencesPage from "./components/preferences/PreferencesPage";
import PlanningPage from "./components/tripPlanner/PlanningPage";

function App() {
  const { userProfile } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        {userProfile && <Header />}
        <Routes>
          {!userProfile ? (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/profile/:uid" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/preferences" element={<PreferencesPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/likes" element={<LikesPage />} />
              <Route path="/trips" element={<TripsPage />} />
              <Route
                path="/city-details/:cityId"
                element={<CityDetailsPage />}
              />
              <Route path="/user-profile" element={<UserProfilePage />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/profile/:uid" element={<ProfilePage />} />
              <Route path="/add-city" element={<AddCityPage />} />
              <Route path="/plan-trip/:cityId" element={<PlanningPage />} />
              <Route path="*" element={<Navigate to="/discover" />} />
            </>
          )}
        </Routes>
        {userProfile && <MobileNavigation />}
      </Router>
    </div>
  );
}

export default App;
