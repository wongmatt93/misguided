import { useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import UserProfile from "../../models/UserProfile";
import "./DesktopHeader.css";
import SettingsOffcanvas from "./Settings/SettingsOffcanvas";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const DesktopHeader = ({ userProfile, refreshProfile }: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  return (
    <header className="DesktopHeader">
      <h1>misguided</h1>
      <button className="menu-button" onClick={handleShow}>
        <RiMenuLine />
      </button>
      <SettingsOffcanvas
        userProfile={userProfile}
        refreshProfile={refreshProfile}
        show={show}
        handleClose={handleClose}
      />
    </header>
  );
};

export default DesktopHeader;
