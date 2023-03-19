import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CityDetailsHeader from "./CityDetailsHeader";
import "./MobileHeader.css";
import TripDetailsHeader from "./TripDetailsHeader";
import TripMessageThreadHeader from "./TripMessageThreadHeader";
import ProfileHeader from "./ProfileHeader";
import { RiMenuLine } from "react-icons/ri";
import InboxHeader from "./InboxHeader";
import SettingsOffcanvas from "../Settings/SettingsOffcanvas";
import UserProfile from "../../../models/UserProfile";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const MobileHeader = ({ userProfile, refreshProfile }: Props) => {
  const [page, setPage] = useState("feed");
  const [show, setShow] = useState(false);
  const path: string = useLocation().pathname;

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
    } else if (path.includes("rating")) {
      setPage("rating");
    } else if (path.includes("trips")) {
      setPage("trips");
    } else if (path.includes("city-details")) {
      setPage("cityDetails");
    } else if (path.includes("get-itinerary")) {
      setPage("choose your dates");
    } else if (path.includes("plan-trip")) {
      setPage("trip planning");
    } else if (path.includes("thread")) {
      setPage("thread");
    } else if (path.includes("inbox")) {
      setPage("inbox");
    } else if (path.includes("discover")) {
      setPage("discover");
    }
  }, [path]);

  return (
    <header className="MobileHeader">
      {page === "profile" ? (
        <ProfileHeader path={path} />
      ) : page === "tripDetails" ? (
        <TripDetailsHeader path={path} />
      ) : page === "cityDetails" ? (
        <CityDetailsHeader path={path} />
      ) : page === "thread" ? (
        <TripMessageThreadHeader path={path} />
      ) : page === "inbox" ? (
        <InboxHeader path={path} />
      ) : (
        <div className="MobileHeaderDiv">
          <h1>{page}</h1>
          <button className="menu-button" onClick={handleShow}>
            <RiMenuLine />
          </button>
        </div>
      )}
      <SettingsOffcanvas
        userProfile={userProfile}
        refreshProfile={refreshProfile}
        show={show}
        handleClose={handleClose}
      />
    </header>
  );
};

export default MobileHeader;
