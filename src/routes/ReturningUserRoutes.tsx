import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import TripDetailsPage from "../components/common/TripDetails/TripDetailsPage";
import DesktopNavigation from "../components/DesktopNavigation/DesktopNavigation";
import ExplorersView from "../components/Explorers/ExplorersView";
import FeedView from "../components/Feed/FeedView";
import GoodbyePage from "../components/Goodbye/GoodbyePage";
import DesktopHeader from "../components/Headers/DesktopHeader";
import MobileHeader from "../components/Headers/MobileHeaders/MobileHeader";
import InboxView from "../components/Inbox/InboxView";
import MobileNavigation from "../components/MobileNavigation/MobileNavigation";
import PlanningView from "../components/Planning/PlanningView";
import TripsView from "../components/Trips/TripsView";
import Trip from "../models/Trip";
import UserProfile from "../models/UserProfile";

interface Props {
  isDesktop: boolean;
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
  currentTrip: Trip | null;
  firstTimeUser: boolean;
}

const ReturningUserRoutes = ({
  isDesktop,
  userProfile,
  refreshProfile,
  currentTrip,
}: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(Boolean(currentTrip));
  }, [currentTrip]);

  const toggleShow = (): void => setShow(!show);

  return (
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
      <main className="signed-in-main">
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
      </main>
      {!isDesktop && (
        <MobileNavigation notifications={userProfile.notifications} />
      )}
    </>
  );
};

export default ReturningUserRoutes;
