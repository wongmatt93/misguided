import { useContext, useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
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
import LandingHeader from "./components/LandingPage/LandingHeader";
import MobileHeader from "./components/Headers/MobileHeaders/MobileHeader";
import DesktopNavigation from "./components/DesktopNavigation/DesktopNavigation";
import MobileNavigation from "./components/MobileNavigation/MobileNavigation";
import LandingPage from "./components/LandingPage/LandingPage";
import WelcomeView from "./components/Welcome/WelcomeView";
import FeedView from "./components/Feed/FeedView";
import ExplorersView from "./components/Explorers/ExplorersView";
import PlanningView from "./components/Planning/PlanningView";
import TripsView from "./components/Trips/TripsView";
import InboxView from "./components/Inbox/InboxView";
import ProfilePage from "./components/Explorers/Profile/ProfilePage";
import TripDetailsPage from "./components/common/TripDetails/TripDetailsPage";
import GoodbyePage from "./components/Goodbye/GoodbyePage";

import "./App.css";

function App() {
  const {
    firstTimeUser,
    userProfile,
    setUserProfile,
    refreshProfile,
    currentTrip,
  } = useContext(AuthContext);
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
        {!firstTimeUser && (
          <main className="signed-in-main">
            {userProfile && (
              <>
                {isDesktop && (
                  <DesktopNavigation
                    notifications={userProfile.notifications}
                  />
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
                    path="/feed/*"
                    element={<FeedView userProfile={userProfile} />}
                  />
                  <Route
                    path="/explorers/*"
                    element={
                      <ExplorersView
                        userProfile={userProfile}
                        refreshProfile={refreshProfile}
                      />
                    }
                  />
                  <Route
                    path="/trips/*"
                    element={<TripsView userTrips={userProfile.trips} />}
                  />
                  <Route
                    path="/plan-trip/*"
                    element={
                      <PlanningView
                        userProfile={userProfile}
                        refreshProfile={refreshProfile}
                      />
                    }
                  />
                  <Route
                    path="/inbox/*"
                    element={
                      <InboxView
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
                  <Route path="*" element={<Navigate to="/feed" />} />
                </Routes>
              </>
            )}

            {!userProfile && (
              <Routes>
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
                <Route
                  path="/explorers/trip-details/:tripId/"
                  element={<TripDetailsPage />}
                />
                <Route path="/good-bye" element={<GoodbyePage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            )}
          </main>
        )}
        {firstTimeUser && (
          <main className="new-user-main">
            {userProfile && (
              <Routes>
                <Route
                  path="/welcome"
                  element={
                    <WelcomeView
                      userProfile={userProfile}
                      setUserProfile={setUserProfile}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/welcome" />} />
              </Routes>
            )}
          </main>
        )}
        {userProfile && !isDesktop && (
          <MobileNavigation notifications={userProfile.notifications} />
        )}
      </Router>
    </div>
  );
}

export default App;
