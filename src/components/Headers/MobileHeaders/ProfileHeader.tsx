import { useEffect, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import UserProfile from "../../../models/UserProfile";
import { getUserByUid } from "../../../services/userService";
import "./ProfileHeader.css";

interface Props {
  path: string;
}

const ProfileHeader = ({ path }: Props) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    getUserByUid(path.split("profile/")[1]).then((response) =>
      setUser(response)
    );
  }, [path]);

  return (
    <>
      {user && (
        <div className="ProfileHeader MobileHeaderDiv">
          <h1>{user.username}</h1>
          <button className="menu-button">
            <RiMenuLine />
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;
