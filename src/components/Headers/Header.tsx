import { RiSpyFill } from "react-icons/ri";
import UserProfile from "../../models/UserProfile";
import "./Header.css";

interface Props {
  userProfile: UserProfile;
}

const Header = ({ userProfile }: Props) => {
  return (
    <header className="Header">
      <h1>misguided</h1>
      <div>
        <span className="username">{userProfile.username}</span>
        <RiSpyFill />
      </div>
    </header>
  );
};

export default Header;
