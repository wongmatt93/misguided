import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "./context/AuthContext";
import DesktopHeader from "./components/Headers/DesktopHeader";
import LandingPage from "./components/LandingPage/LandingPage";
import DiscoverPage from "./components/Discover/DiscoverPage";
import MobileNavigation from "./components/MobileNavigation/MobileNavigation";
import TripsPage from "./components/Trips/TripsPage";
import "./App.css";
import ProfilePage from "./components/Explorers/Profile/ProfilePage";
import CityDetailsPage from "./components/CityDetails/CityDetailsPage";
import InitialSigninPage from "./components/initialSignIn/InitialSignInPage";
import { useMediaQuery } from "react-responsive";
import PlanningRouter from "./components/Planning/PlanningRouter";
import InboxPage from "./components/Inbox/InboxPage";
import MobileHeader from "./components/Headers/MobileHeaders/MobileHeader";
import DesktopNavigation from "./components/DesktopNavigation/DesktopNavigation";
import LandingHeader from "./components/LandingPage/LandingHeader";
import TripDetailsPage from "./components/TripDetails/TripDetailsPage";
import FeedRouter from "./components/Feed/FeedRouter";
import ExplorersRouter from "./components/Explorers/ExplorersRouter";
import { Toast, ToastContainer } from "react-bootstrap";
import GoodbyePage from "./components/Goodbye/GoodbyePage";

function App() {
  const { userProfile, refreshProfile, currentTrip } = useContext(AuthContext);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(Boolean(currentTrip));
  }, [currentTrip]);

  const toggleShow = (): void => setShow(!show);

  return (
    <div className="App">
      <Router>
        {!userProfile && <LandingHeader />}
        {userProfile && (
          <>
            {isDesktop && (
              <DesktopHeader
                userProfile={userProfile}
                refreshProfile={refreshProfile}
              />
            )}
            {!isDesktop && (
              <MobileHeader
                userProfile={userProfile}
                refreshProfile={refreshProfile}
              />
            )}
          </>
        )}
        <main>
          {userProfile && (
            <>
              {isDesktop && (
                <DesktopNavigation notifications={userProfile.notifications} />
              )}
              {currentTrip && (
                <ToastContainer position="top-center">
                  <Toast show={show} onClose={toggleShow} bg="light">
                    <Toast.Header>Trip Alert!</Toast.Header>
                    <Toast.Body>
                      It looks like you're currently on a trip!{" "}
                      <Link
                        to={`/current/trip-details/${currentTrip._id!}`}
                        onClick={toggleShow}
                      >
                        Click here to view your trip.
                      </Link>
                    </Toast.Body>
                  </Toast>
                </ToastContainer>
              )}
              <Routes>
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
                  element={
                    <ExplorersRouter
                      userProfile={userProfile}
                      refreshProfile={refreshProfile}
                    />
                  }
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
                  path="/current/trip-details/:tripId"
                  element={<TripDetailsPage />}
                />
                <Route path="/good-bye" element={<GoodbyePage />} />
                <Route path="*" element={<Navigate to="/routes" />} />
              </Routes>
            </>
          )}
          {!userProfile && (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/profile/:uid" element={<ProfilePage />} />
              <Route path="/search/profile/:uid" element={<ProfilePage />} />
              <Route path="/explorers/profile/:uid" element={<ProfilePage />} />
              <Route
                path="/trip-details/:tripId/"
                element={<TripDetailsPage />}
              />
              <Route
                path="/feed/trip-details/:tripId/"
                element={<TripDetailsPage />}
              />
              <Route path="/good-bye" element={<GoodbyePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </main>
        {userProfile && !isDesktop && (
          <MobileNavigation notifications={userProfile.notifications} />
        )}
      </Router>
    </div>
  );
}

export default App;
