import { Link } from "react-router-dom";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { ImMap } from "react-icons/im";
import { RiUserFill } from "react-icons/ri";
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
            <Link to="/home">
              <div className="trip-icon">
                <AiFillHome />
                {/* {tripRequests > 0 && <div className="notification-dot"></div>} */}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/likes">
              <ImMap />
            </Link>
          </li>
          <li>
            <Link to="/discover">
              <BsFillPlusSquareFill />
            </Link>
          </li>
          <li>
            <Link to="/friends">
              <AiFillMessage />
            </Link>
          </li>
          <li>
            <Link to="/user-profile">
              <RiUserFill />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default MobileNavigation;
