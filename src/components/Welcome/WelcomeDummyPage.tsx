import { useState } from "react";

import UserProfile from "../../models/UserProfile";
import DummyDesktopNav from "./DummyDesktopNav";
import DummyFooter from "./DummyFooter";
import DummyHeader from "./DummyHeader";
import DummyMain from "./DummyMain";
import FirstTimeUserView from "./FirstTimeUserView";
import "./WelcomeDummyPage.css";

interface Props {
  isDesktop: boolean;
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
  setFirstTimeUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const WelcomeDummyPage = ({
  isDesktop,
  userProfile,
  refreshProfile,
  setFirstTimeUser,
}: Props) => {
  const [stage, setStage] = useState("");

  return (
    <section className="WelcomeDummyPage">
      <DummyHeader
        userProfile={userProfile}
        isDesktop={isDesktop}
        stage={stage}
      />
      {isDesktop && <DummyDesktopNav stage={stage} />}
      <DummyMain
        stage={stage}
        userProfile={userProfile}
        refreshProfile={refreshProfile}
      />
      {!isDesktop && <DummyFooter stage={stage} />}
      <FirstTimeUserView
        stage={stage}
        setStage={setStage}
        setFirstTimeUser={setFirstTimeUser}
      />
    </section>
  );
};

export default WelcomeDummyPage;
