import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PreferencesForm from "../Settings/Preferences/PreferencesForm";
import "./InitialSignInPage.css";
import InitialPhotoUploadForm from "./InitialPhotoUploadForm";
import InitialHometownForm from "./InitialHometownForm";
import UsernameForm from "./UsernameForm";
import UserProfile from "../../models/UserProfile";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const InitialSignInPage = ({ userProfile, refreshProfile }: Props) => {
  const navigate = useNavigate();
  const [stage, setStage] = useState("username");

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
        navigate("/feed");
      }
    }
  }, [navigate, userProfile]);

  return (
    <main className="InitialSignInPage">
      {stage === "username" && (
        <UsernameForm
          uid={userProfile.uid}
          refreshProfile={refreshProfile}
          setStage={setStage}
        />
      )}
      {stage === "image" && (
        <InitialPhotoUploadForm
          uid={userProfile.uid}
          refreshProfile={refreshProfile}
          setStage={setStage}
        />
      )}
      {stage === "hometown" && (
        <InitialHometownForm
          uid={userProfile.uid}
          refreshProfile={refreshProfile}
          setStage={setStage}
        />
      )}
      {stage === "preferences" && (
        <>
          <h2>Choose your preferences</h2>
          <PreferencesForm
            userProfile={userProfile}
            refreshProfile={refreshProfile}
          />
        </>
      )}
    </main>
  );
};

export default InitialSignInPage;
