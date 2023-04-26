import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { RiFlightTakeoffFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import usePaginate from "../../../hooks/usePaginate";
import useTimer from "../../../hooks/useTimer";
import LoadingSpinner from "../../common/LoadingSpinner";
import TripsCluster from "./TripsCluster";
import "./UpcomingTripsContainer.css";

const UpcomingTripsContainer = () => {
  const { upcomingTrips } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const paginatedTrips = usePaginate(upcomingTrips, 10);
  const timesUp: boolean = useTimer(800);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (buttonLoading) {
      interval = setInterval(() => setButtonLoading(false), 800);
    }

    return () => clearInterval(interval);
  }, [page, buttonLoading]);

  const handleClick = (): void => {
    setButtonLoading(true);
    setPage(page + 1);
  };

  return (
    <section className="UpcomingTripsContainer">
      {upcomingTrips.length > 0 ? (
        <>
          {!timesUp && <LoadingSpinner />}
          <ul style={{ display: timesUp ? "block" : "none" }}>
            {Object.keys(paginatedTrips).map(
              (key, index) =>
                Number(key) <= page && (
                  <TripsCluster key={index} trips={paginatedTrips[key]} />
                )
            )}
          </ul>
          {paginatedTrips[page + 1] ? (
            <Button
              className="centered-bottom"
              style={{ display: timesUp ? "flex" : "none" }}
              variant="link"
              onClick={handleClick}
            >
              {buttonLoading ? "Loading..." : "Load More"}
            </Button>
          ) : (
            page > 0 && (
              <p className="centered-bottom">
                {buttonLoading ? "Loading..." : "You have reached the end"}
              </p>
            )
          )}
        </>
      ) : !timesUp ? (
        <LoadingSpinner />
      ) : (
        <div className="empty">
          <RiFlightTakeoffFill />
          <p>You don't have any upcoming trips</p>
          <Link to="/plan-trip">Click here to start planning one!</Link>
        </div>
      )}
    </section>
  );
};

export default UpcomingTripsContainer;
