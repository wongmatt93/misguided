import { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthContext from "./context/AuthContext";
import LandingPage from "./components/LandingPage/LandingPage";
import Homepage from "./components/Homepage/Homepage";

import "./App.css";
import Welcome from "./components/FirstTimeUserPage/Welcome";

function App() {
  // hooks
  const { userProfile, firstTimeUser, setUserProfile, refreshProfile } =
    useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        {!userProfile && !firstTimeUser && <LandingPage />}

        {!userProfile && firstTimeUser && (
          <Welcome
            firstTimeUser={firstTimeUser}
            refreshProfile={() => refreshProfile(firstTimeUser.uid)}
          />
        )}

        {userProfile && (
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
