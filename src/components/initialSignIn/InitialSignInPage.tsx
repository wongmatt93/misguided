import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import PreferencesForm from "./../userProfile/preferences/PreferencesForm";
import "./InitialSignInPage.css";
import InitialPhotoUploadForm from "./InitialPhotoUploadForm";
import InitialHometownForm from "./InitialHometownForm";

const InitialSignInPage = () => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stage, setStage] = useState("image");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userProfile) {
      if (
        userProfile.photoURL &&
        userProfile.preferences &&
        userProfile.hometownId
      ) {
        navigate("/discover");
      }
    }
  }, [navigate, userProfile]);

  return (
    <main className="InitialSignInPage">
      {userProfile &&
        (stage === "image" ? (
          <InitialPhotoUploadForm
            userProfile={userProfile}
            refreshProfile={refreshProfile}
            setStage={setStage}
          />
        ) : stage === "hometown" ? (
          <InitialHometownForm
            userProfile={userProfile}
            refreshProfile={refreshProfile}
            setStage={setStage}
          />
        ) : (
          <>
            <h2>Choose your preferences</h2>
            <PreferencesForm setShow={setShow} />
          </>
        ))}
    </main>
  );
};

export default InitialSignInPage;
