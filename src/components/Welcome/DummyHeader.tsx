import { useEffect, useState } from "react";
import UserProfile from "../../models/UserProfile";
import "./DummyHeader.css";

interface Props {
  userProfile: UserProfile;
  isDesktop: boolean;
  stage: string;
}

const DummyHeader = ({ userProfile, isDesktop, stage }: Props) => {
  const [header, setHeader] = useState("misguided");

  useEffect(() => {
    if (isDesktop) {
      setHeader("misguided");
    } else {
      if (stage === "planning") {
        setHeader("trip planning");
      } else if (stage === "" || stage === "feed") {
        setHeader("misguided");
      } else {
        setHeader(stage);
      }
    }
  }, [isDesktop, stage]);

  return (
    <div className="DummyHeader">
      <h1>{header}</h1>
      <button type="button" disabled>
        <img
          className="circle-image"
          src={userProfile.photoURL!}
          alt={userProfile.photoURL!}
        />
      </button>
    </div>
  );
};

export default DummyHeader;
