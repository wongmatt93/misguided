import { Link } from "react-router-dom";
import { MdCardTravel } from "react-icons/md";
import { MdTravelExplore } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiUserFill } from "react-icons/ri";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { userProfile } = useContext(AuthContext);

  return (
    <header className="Header">
      <ul className="outer-list">
        <li className="header-item">
          <p>Hello, {userProfile!.displayName}</p>
        </li>
        <li className="header-item">
          <nav>
            <ul className="inner-list">
              <Link to="/trips">
                <li>
                  <MdCardTravel />
                  <p>Trips</p>
                </li>
              </Link>
              <Link to="/likes">
                <li>
                  <AiFillHeart />
                  <p>Like</p>
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
        </li>
      </ul>
    </header>
  );
};

export default Header;
