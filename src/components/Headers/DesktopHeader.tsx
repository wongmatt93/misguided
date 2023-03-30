import { useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import UserProfile from "../../models/UserProfile";
import { isWelcome } from "../../utils/welcomeFunctions";
import "./DesktopHeader.css";
import SettingsOffcanvas from "./Settings/SettingsOffcanvas";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const DesktopHeader = ({ userProfile, refreshProfile }: Props) => {
  const [show, setShow] = useState(false);
  const path: string = useLocation().pathname;

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  return (
    <header
      className="DesktopHeader"
      style={{ display: isWelcome(path) ? "none" : "flex" }}
    >
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
