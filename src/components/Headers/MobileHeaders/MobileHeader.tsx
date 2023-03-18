import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChooseDatesHeader from "./ChooseDatesHeader";
import CityDetailsHeader from "./CityDetailsHeader";
import DiscoverHeader from "./DiscoverHeader";
import FeedHeader from "./FeedHeader";
import InboxHeader from "./InboxHeader";
import "./MobileHeader.css";
import PlanTripHeader from "./PlanTripHeader";
import RatingHeader from "./RatingHeader";
import SettingsHeader from "./SettingsHeader";
import TripCommentsHeader from "./TripCommentsHeader";
import TripDetailsHeader from "./TripDetailsHeader";
import TripMessageThreadHeader from "./TripMessageThreadHeader";
import TripsHeader from "./TripsHeader";
import ExplorersHeader from "./ExplorersHeader";

const MobileHeader = () => {
  const [page, setPage] = useState("feed");
  const path: string = useLocation().pathname;

  useEffect(() => {
    if (path.includes("trip-details")) {
      setPage("tripDetails");
    } else if (path.includes("feed")) {
      setPage("feed");
    } else if (path.includes("explorers")) {
      setPage("explorers");
    } else if (path.includes("rating")) {
      setPage("rating");
    } else if (path.includes("trips")) {
      setPage("trips");
    } else if (path.includes("comments")) {
      setPage("tripComments");
    } else if (path.includes("city-details")) {
      setPage("cityDetails");
    } else if (path.includes("plan-trip/get-itinerary")) {
      setPage("getItinerary");
    } else if (path.includes("plan-trip")) {
      setPage("planTrip");
    } else if (path.includes("inbox")) {
      setPage("inbox");
    } else if (path.includes("discover")) {
      setPage("discover");
    } else if (path.includes("thread")) {
      setPage("thread");
    } else if (path.includes("settings")) {
      setPage("settings");
    }
  }, [path]);

  return (
    <>
      {page === "feed" && <FeedHeader />}
      {page === "explorers" && <ExplorersHeader />}
      {page === "trips" && <TripsHeader />}
      {page === "tripDetails" && <TripDetailsHeader path={path} />}
      {page === "tripComments" && <TripCommentsHeader />}
      {page === "rating" && <RatingHeader />}
      {page === "planTrip" && <PlanTripHeader />}
      {page === "discover" && <DiscoverHeader />}
      {page === "cityDetails" && <CityDetailsHeader path={path} />}
      {page === "getItinerary" && <ChooseDatesHeader />}
      {page === "inbox" && <InboxHeader path={path} />}
      {page === "thread" && <TripMessageThreadHeader path={path} />}
      {page === "settings" && <SettingsHeader path={path} />}
    </>
  );
};

export default MobileHeader;
