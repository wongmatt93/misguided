import { useEffect, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { UserProfile } from "../../../../models/UserProfile";
import { getCurrentDateString } from "../../../../utils/dateFunctions";
import { getUserProfileByUid } from "../../../../services/userProfileServices";
import "./ExplorerProfileHeader.css";

interface Props {
  uid: string;
  path: string;
}

const ExplorerProfileHeader = ({ uid, path }: Props) => {
  // variables
  const [user, setUser] = useState<UserProfile | null>(null);

  // functions
  useEffect(() => {
    getUserProfileByUid(path.split("profile/")[1], getCurrentDateString).then(
      (response) => setUser(response)
    );
  }, [path]);

  return (
    <>
      {user && (
        <div className="ExplorerProfileHeader">
          <h1>{user.username}</h1>
          {uid !== user.uid && (
            <button className="menu-button">
              <RiMenuLine />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ExplorerProfileHeader;
