import { NavLink } from "react-router-dom";
import "./TripsHeader.css";

const TripsHeader = () => {
  return (
    <header className="TripsHeader">
      <nav>
        <ul>
          <li>
            <NavLink to="/trips/upcoming-trips">Upcoming Trips</NavLink>
          </li>
          <li>
            <NavLink to="/trips/past-trips">Past Trips</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default TripsHeader;
