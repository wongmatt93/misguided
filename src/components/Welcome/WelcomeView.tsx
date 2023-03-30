import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PreferencesForm from "../Headers/Settings/Preferences/PreferencesForm";
import "./WelcomeView.css";
import InitialPhotoUploadForm from "./InitialPhotoUploadForm";
import InitialHometownForm from "./InitialHometownForm";
import UsernameForm from "./UsernameForm";
import UserProfile from "../../models/UserProfile";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const WelcomeView = ({ userProfile, refreshProfile }: Props) => {
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
    <section className="WelcomeView">
      <h1 className="animate__animated animate__fadeInDown animate__fast">
        Welcome to Misguided
      </h1>
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
          <p className="preferences-label">Choose your preferences</p>
          <PreferencesForm
            userProfile={userProfile}
            refreshProfile={refreshProfile}
          />
        </>
      )}
    </section>
  );
};

export default WelcomeView;
