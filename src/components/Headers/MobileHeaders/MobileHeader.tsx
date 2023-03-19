import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CityDetailsHeader from "./CityDetailsHeader";
import InboxHeader from "./InboxHeader";
import "./MobileHeader.css";
import SettingsHeader from "./SettingsHeader";
import TripDetailsHeader from "./TripDetailsHeader";
import TripMessageThreadHeader from "./TripMessageThreadHeader";
import ProfileHeader from "./ProfileHeader";

const MobileHeader = () => {
  const [page, setPage] = useState("feed");
  const path: string = useLocation().pathname;

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
    } else if (path.includes("plan-trip/get-itinerary")) {
      setPage("choose your dates");
    } else if (path.includes("plan-trip")) {
      setPage("trip planning");
    } else if (path.includes("thread")) {
      setPage("thread");
    } else if (path.includes("inbox")) {
      setPage("inbox");
    } else if (path.includes("discover")) {
      setPage("discover");
    } else if (path.includes("settings")) {
      setPage("settings");
    }
  }, [path]);

  return (
    <header>
      {/* 
      {page === "profile" && <ProfileHeader path={path} />}
      {page === "tripDetails" && <TripDetailsHeader path={path} />}
      {page === "cityDetails" && <CityDetailsHeader path={path} />}
      {page === "thread" && <TripMessageThreadHeader path={path} />}
      {page === "settings" && <SettingsHeader path={path} />} */}
      <h1>{page}</h1>
    </header>
  );
};

export default MobileHeader;
