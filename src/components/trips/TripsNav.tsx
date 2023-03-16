import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./TripsNav.css";

const TripsNav = () => {
  const [detailsShowing, setDetailsShowing] = useState(false);
  const location: string = useLocation().pathname;

  useEffect(() => {
    if (location.includes("trip-details")) {
      setDetailsShowing(true);
    } else {
      setDetailsShowing(false);
    }
  }, [location]);

  return (
    <nav
      className="TripsNav"
      style={{ display: detailsShowing ? "none" : "block" }}
    >
      <ul>
        <li>
          <NavLink to="/trips/upcoming-trips">Upcoming Trips</NavLink>
        </li>
        <li>
          <NavLink to="/trips/past-trips">Past Trips</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default TripsNav;
