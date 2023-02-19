import { NavLink } from "react-router-dom";
import {
  RiDiscussFill,
  RiSpyFill,
  RiHome2Fill,
  RiAddBoxFill,
  RiLuggageCartFill,
} from "react-icons/ri";
import "./MobileNavigation.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const MobileNavigation = () => {
  const { userProfile } = useContext(AuthContext);
  const [tripRequests, setTripRequests] = useState(0);

  useEffect(() => {
    if (userProfile) {
      const numTripRequests: number = userProfile.trips.filter(
        (trip) => !trip.accepted
      ).length;
      setTripRequests(numTripRequests);
    }
  }, [userProfile]);

  return (
    <footer className="MobileNavigation">
      <nav>
        <ul>
          <li>
            <NavLink to="/home">
              <div className="trip-icon">
                <RiHome2Fill />
                {/* {tripRequests > 0 && <div className="notification-dot"></div>} */}
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/trips">
              <RiLuggageCartFill />
            </NavLink>
          </li>
          <li>
            <NavLink to="/plan-trip">
              <RiAddBoxFill />
            </NavLink>
          </li>
          <li>
            <NavLink to="/inbox">
              <RiDiscussFill />
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-profile">
              <RiSpyFill />
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default MobileNavigation;
