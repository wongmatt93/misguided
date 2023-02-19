import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { ImMap } from "react-icons/im";
import { RiUserFill } from "react-icons/ri";
import { RiMessage2Fill } from "react-icons/ri";
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
                <AiFillHome />
                {/* {tripRequests > 0 && <div className="notification-dot"></div>} */}
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/trips">
              <ImMap />
            </NavLink>
          </li>
          <li>
            <NavLink to="/plan-trip">
              <BsFillPlusSquareFill />
            </NavLink>
          </li>
          <li>
            <NavLink to="/inbox">
              <RiMessage2Fill />
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-profile">
              <RiUserFill />
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default MobileNavigation;
