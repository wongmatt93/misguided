import { Navigate, Route, Routes } from "react-router-dom";
import DesktopNavigation from "../components/DesktopNavigation/DesktopNavigation";
import DesktopHeader from "../components/Headers/DesktopHeader";
import MobileHeader from "../components/Headers/MobileHeaders/MobileHeader";
import MobileNavigation from "../components/MobileNavigation/MobileNavigation";
import WelcomeDummyPage from "../components/Welcome/WelcomeDummyPage";
import WelcomeView from "../components/Welcome/WelcomeView";
import UserProfile from "../models/UserProfile";

interface Props {
  isDesktop: boolean;
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
  setFirstTimeUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const FirstTimeUserRoutes = ({
  isDesktop,
  userProfile,
  refreshProfile,
  setUserProfile,
  setFirstTimeUser,
}: Props) => {
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
      {!userProfile.preferences && (
        <main className="welcome-main">
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
        </main>
      )}
      {userProfile.preferences && (
        <main className="signed-in-main">
          {isDesktop && (
            <DesktopNavigation notifications={userProfile.notifications} />
          )}
          <Routes>
            <Route
              path="/welcome-guide"
              element={
                <WelcomeDummyPage
                  isDesktop={isDesktop}
                  userProfile={userProfile}
                  refreshProfile={refreshProfile}
                  setFirstTimeUser={setFirstTimeUser}
                />
              }
            />
          </Routes>
        </main>
      )}
      {!isDesktop && (
        <MobileNavigation notifications={userProfile.notifications} />
      )}
    </>
  );
};

export default FirstTimeUserRoutes;
