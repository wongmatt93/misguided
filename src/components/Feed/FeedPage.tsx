import { useEffect, useState } from "react";
import { RiCameraOffFill } from "react-icons/ri";
import useTimer from "../../hooks/useTimer";
import ActiveUserProfile from "../../models/UserProfile";
import { getFollowingsTrips } from "../../services/tripServices";
import LoadingCamera from "../common/LoadingCamera";
import FeedCardContainer from "./FeedCardContainer";
import "./FeedPage.css";

interface Props {
  userProfile: ActiveUserProfile;
}

const FeedPage = ({ userProfile }: Props) => {
  const [feedTrips, setFeedTrips] = useState<string[]>([]);
  const timesUp = useTimer(2000);

  useEffect(() => {
    getFollowingsTrips(userProfile).then((response) => {
      const tripIds: string[] = response.map((trip) => trip._id!);
      setFeedTrips(tripIds);
    });
  }, [userProfile]);

  return (
    <section className="FeedPage">
      {!timesUp && <LoadingCamera />}
      {feedTrips.length > 0 ? (
        <FeedCardContainer
          tripIds={feedTrips}
          userProfile={userProfile}
          timesUp={timesUp}
        />
      ) : (
        <div className="empty">
          <RiCameraOffFill />
          <p>Your feed is currently empty.</p>
          <p>Search for users to follow!</p>
        </div>
      )}
    </section>
  );
};

export default FeedPage;
