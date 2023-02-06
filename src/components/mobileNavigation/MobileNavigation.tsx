import { Link } from "react-router-dom";
import { MdLuggage } from "react-icons/md";
import { MdTravelExplore } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiUserFill } from "react-icons/ri";
import "./MobileNavigation.css";

const MobileNavigation = () => {
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
              <BsFillPeopleFill />
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
