import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import PreferencesForm from "./../userProfile/preferences/PreferencesForm";
import "./InitialSignInPage.css";
import InitialPhotoUploadForm from "./InitialPhotoUploadForm";
import InitialHometownForm from "./InitialHometownForm";
import UsernameForm from "./UsernameForm";

const InitialSignInPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stage, setStage] = useState("username");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userProfile) {
      if (!userProfile.username) {
        setStage("username");
      } else if (!userProfile.photoURL) {
        setStage("image");
      } else if (!userProfile.hometownId) {
        setStage("hometown");
      } else if (!userProfile.preferences) {
        setStage("preferences");
      } else {
        navigate("/home");
      }
    }
  }, [navigate, userProfile]);

  return (
    <main className="InitialSignInPage">
      {userProfile && (
        <>
          {stage === "username" && (
            <UsernameForm
              userProfile={userProfile}
              refreshProfile={refreshProfile}
              setStage={setStage}
            />
          )}
          {stage === "image" && (
            <InitialPhotoUploadForm
              userProfile={userProfile}
              refreshProfile={refreshProfile}
              setStage={setStage}
            />
          )}
          {stage === "hometown" && (
            <InitialHometownForm
              userProfile={userProfile}
              refreshProfile={refreshProfile}
              setStage={setStage}
            />
          )}
          {stage === "preferences" && (
            <>
              <h2>Choose your preferences</h2>
              <PreferencesForm setShow={setShow} />
            </>
          )}
        </>
      )}
    </main>
  );
};

export default InitialSignInPage;
