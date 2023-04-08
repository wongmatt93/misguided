import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import AuthContext from "./context/AuthContext";
import SignedOutRoutes from "./routes/SignedOutRoutes";
import FirstTimeUserRoutes from "./routes/FirstTimeUserRoutes";
import ReturningUserRoutes from "./routes/ReturningUserRoutes";

import "./App.css";

function App() {
  const {
    firstTimeUser,
    setFirstTimeUser,
    userProfile,
    setUserProfile,
    refreshProfile,
    currentTrip,
  } = useContext(AuthContext);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <div className="App">
      <Router>
        {!userProfile && <SignedOutRoutes />}
        {userProfile && firstTimeUser && (
          <FirstTimeUserRoutes
            isDesktop={isDesktop}
            userProfile={userProfile}
            refreshProfile={refreshProfile}
            setUserProfile={setUserProfile}
            setFirstTimeUser={setFirstTimeUser}
          />
        )}
        {userProfile && !firstTimeUser && (
          <ReturningUserRoutes
            isDesktop={isDesktop}
            userProfile={userProfile}
            refreshProfile={refreshProfile}
            currentTrip={currentTrip}
            firstTimeUser={firstTimeUser}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
