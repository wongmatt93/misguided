import { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "./context/AuthContext";
import LandingPage from "./components/LandingPage/LandingPage";
import Homepage from "./components/Homepage/Homepage";
import "./App.css";
import WelcomeDummyPage from "./components/FirstTimeUserPage/DummyPage/WelcomeDummyPage";
import { useMediaQuery } from "react-responsive";
import NewUserInformationSection from "./components/FirstTimeUserPage/NewUserInformationSection";

function App() {
  // hooks
  const {
    userProfile,
    firstTimeUser,
    firstTimeUid,
    firstTimeDisplayName,
    firstTimeEmail,
    firstTimePhoneNumber,
    setUserProfile,
    setFirstTimeUser,
    refreshProfile,
  } = useContext(AuthContext);
  const isDesktop: boolean = useMediaQuery({ minWidth: 768 });

  return (
    <div className="App">
      <Router>
        {!userProfile && !firstTimeUser && <LandingPage />}

        {!userProfile &&
          firstTimeUser &&
          firstTimeUid &&
          firstTimeDisplayName &&
          firstTimeEmail &&
          firstTimePhoneNumber && (
            <NewUserInformationSection
              uid={firstTimeUid}
              displayName={firstTimeDisplayName}
              email={firstTimeEmail}
              phoneNumber={firstTimePhoneNumber}
              refreshProfile={() => refreshProfile(firstTimeUid)}
            />
          )}

        {userProfile && firstTimeUser && (
          <WelcomeDummyPage
            isDesktop={isDesktop}
            userProfile={userProfile}
            refreshProfile={() => refreshProfile(userProfile.uid)}
            setFirstTimeUser={() => setFirstTimeUser(false)}
          />
        )}

        {userProfile && !firstTimeUser && (
          <Homepage
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            refreshProfile={() => refreshProfile(userProfile.uid)}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
