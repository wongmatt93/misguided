import { RiCameraOffFill } from "react-icons/ri";

import { useEffect, useState } from "react";
import { Trip } from "../../../models/Trip";
import { UserProfile } from "../../../models/UserProfile";
import { getFollowingsTrips } from "../../../services/tripServices";
import "./FeedMain.css";
import FeedContainer from "./FeedContainer";

interface Props {
  userProfile: UserProfile;
}

const FeedMain = ({ userProfile }: Props) => {
  // variables
  const { uid, followings } = userProfile;
  const [feedTrips, setFeedTrips] = useState<Trip[]>([]);

  // functions
  const refreshFeedTrips = (): Promise<void> =>
    getFollowingsTrips(uid, followings).then((response) =>
      setFeedTrips(response)
    );

  useEffect(() => {
    getFollowingsTrips(uid, followings).then((response) => {
      setFeedTrips(response);
    });
  }, [uid, followings]);

  return (
    <div className="FeedMain">
      {feedTrips.length > 0 ? (
        <FeedContainer
          uid={uid}
          feedTrips={feedTrips}
          refreshFeedTrips={refreshFeedTrips}
        />
      ) : (
        <div className="empty">
          <RiCameraOffFill />
          <p>Your feed is currently empty.</p>
          <p>Search for users to follow!</p>
        </div>
      )}
    </div>
  );
};

export default FeedMain;
