import { useEffect, useState } from "react";
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
    <header className="ProfileHeader">
      {user && <h1>{user.username}</h1>}
    </header>
  );
};

export default ProfileHeader;
