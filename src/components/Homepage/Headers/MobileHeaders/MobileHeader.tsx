import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserProfile } from "../../../../models/UserProfile";
import SettingsOffcanvas from "../../Offcanvases/Settings/SettingsOffcanvas";
import ExplorerProfileHeader from "./ExplorerProfileHeader";
import "./MobileHeader.css";
import TripDetailsHeader from "./TripDetailsHeader";

interface Props {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  refreshProfile: () => Promise<void>;
}

const MobileHeader = ({
  userProfile,
  setUserProfile,
  refreshProfile,
}: Props) => {
  // variables
  const [page, setPage] = useState("feed");
  const [show, setShow] = useState(false);
  const path: string = useLocation().pathname;
  const { uid, photoURL } = userProfile;

  // functions
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  useEffect(() => {
    if (path.includes("trip-details")) {
      setPage("tripDetails");
    } else if (path.includes("feed")) {
      setPage("misguided");
    } else if (path.includes("profile")) {
      setPage("profile");
    } else if (path.includes("explorers")) {
      setPage("explorers");
    } else if (path.includes("trips")) {
      setPage("trips");
    } else if (path.includes("planning")) {
      setPage("planning");
    } else if (path.includes("inbox")) {
      setPage("inbox");
    }
  }, [path]);

  return (
    <header className="MobileHeader">
      {page === "profile" ? (
        <ExplorerProfileHeader uid={uid} />
      ) : page === "tripDetails" ? (
        <TripDetailsHeader refreshProfile={refreshProfile} uid={uid} />
      ) : (
        <>
          <h1>{page}</h1>
          <button className="menu-button" onClick={handleShow}>
            <img className="circle-image" src={photoURL!} alt={photoURL!} />
          </button>
        </>
      )}
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

export default MobileHeader;
