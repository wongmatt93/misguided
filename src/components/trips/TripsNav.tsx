import { NavLink } from "react-router-dom";
import "./TripsNav.css";

const TripsNav = () => {
  return (
    <nav className="TripsNav">
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
