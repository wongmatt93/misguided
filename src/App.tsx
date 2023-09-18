import { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthContext from "./context/AuthContext";
import LandingPage from "./components/LandingPage/LandingPage";
import Homepage from "./components/Homepage/Homepage";

import "./App.css";

function App() {
  // hooks
  const { userProfile, setUserProfile, refreshProfile } =
    useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        {!userProfile && <LandingPage />}

        {userProfile && (
          <Homepage
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            refreshProfile={refreshProfile}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
