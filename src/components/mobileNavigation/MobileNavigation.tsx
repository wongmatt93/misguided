import { Link } from "react-router-dom";
import { MdLuggage } from "react-icons/md";
import { MdTravelExplore } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiUserFill } from "react-icons/ri";
import "./MobileNavigation.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const MobileNavigation = () => {
  const { userProfile } = useContext(AuthContext);
  const [friendRequests, setFriendRequests] = useState(0);

  useEffect(() => {
    if (userProfile) {
      const numRequests: number = userProfile.friends.filter(
        (friend) => friend.friendRequestStatus === "received"
      ).length;
      setFriendRequests(numRequests);
    }
  }, [userProfile]);

  return (
    <footer className="MobileNavigation">
      <nav>
        <ul>
          <Link to="/trips">
            <li>
              <MdLuggage />
              <p>Trips</p>
            </li>
          </Link>
          <Link to="/likes">
            <li>
              <AiFillHeart />
              <p>Likes</p>
            </li>
          </Link>
          <Link to="/discover">
            <li>
              <MdTravelExplore />
              <p>Discover</p>
            </li>
          </Link>
          <Link to="/friends">
            <li>
              <div className="friend-icon">
                <BsFillPeopleFill />
                {friendRequests > 0 && <div className="notification-dot"></div>}
              </div>
              <p>Friends</p>
            </li>
          </Link>
          <Link to="/user-profile">
            <li>
              <RiUserFill />
              <p>Profile</p>
            </li>
          </Link>
        </ul>
      </nav>
    </footer>
  );
};

export default MobileNavigation;
