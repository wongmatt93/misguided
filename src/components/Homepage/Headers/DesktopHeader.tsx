import { useState } from "react";
import { UserProfile } from "../../../models/UserProfile";
import SettingsOffcanvas from "../Offcanvases/Settings/SettingsOffcanvas";
import "./DesktopHeader.css";

interface Props {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  refreshProfile: () => Promise<void>;
}

const DesktopHeader = ({
  userProfile,
  setUserProfile,
  refreshProfile,
}: Props) => {
  // variables
  const [show, setShow] = useState(false);

  // functions
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  return (
    <header className="DesktopHeader">
      <h1>misguided</h1>
      <button className="menu-button" onClick={handleShow}>
        <img
          className="circle-image"
          src={userProfile.photoURL!}
          alt={userProfile.photoURL!}
        />
      </button>
      <SettingsOffcanvas
        userProfile={userProfile}
        refreshProfile={refreshProfile}
        setUserProfile={setUserProfile}
        show={show}
        handleClose={handleClose}
      />
    </header>
  );
};

export default DesktopHeader;
