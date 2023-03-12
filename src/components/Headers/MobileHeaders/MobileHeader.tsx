import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChooseDatesHeader from "./ChooseDatesHeader";
import CityDetailsHeader from "./CityDetailsHeader";
import HomeHeader from "./HomeHeader";
import InboxHeader from "./InboxHeader";
import "./MobileHeader.css";
import PlanTripHeader from "./PlanTripHeader";
import SearchHeader from "./SearchHeader";
import SettingsHeader from "./SettingsHeader";
import TripCommentsHeader from "./TripCommentsHeader";
import TripDetailsHeader from "./TripDetailsHeader";
import TripMessageThreadHeader from "./TripMessageThreadHeader";
import TripsHeader from "./TripsHeader";

const MobileHeader = () => {
  const [page, setPage] = useState("home");
  const path: string = useLocation().pathname;

  useEffect(() => {
    if (path.includes("home")) {
      setPage("home");
    } else if (path.includes("search")) {
      setPage("search");
    } else if (path.includes("trips")) {
      setPage("trips");
    } else if (path.includes("comments")) {
      setPage("tripComments");
    } else if (path.includes("trip-details")) {
      setPage("tripDetails");
    } else if (path.includes("city-details")) {
      setPage("cityDetails");
    } else if (path.includes("plan-trip/get-itinerary")) {
      setPage("getItinerary");
    } else if (path.includes("plan-trip")) {
      setPage("planTrip");
    } else if (path.includes("inbox")) {
      setPage("inbox");
    } else if (path.includes("thread")) {
      setPage("thread");
    } else if (path.includes("settings")) {
      setPage("settings");
    }
  }, [path]);

  return (
    <>
      {page === "home" && <HomeHeader />}
      {page === "search" && <SearchHeader />}
      {page === "trips" && <TripsHeader />}
      {page === "tripDetails" && <TripDetailsHeader path={path} />}
      {page === "tripComments" && <TripCommentsHeader />}
      {page === "planTrip" && <PlanTripHeader />}
      {page === "cityDetails" && <CityDetailsHeader path={path} />}
      {page === "getItinerary" && <ChooseDatesHeader />}
      {page === "inbox" && <InboxHeader path={path} />}
      {page === "thread" && <TripMessageThreadHeader path={path} />}
      {page === "settings" && <SettingsHeader path={path} />}
    </>
  );
};

export default MobileHeader;
