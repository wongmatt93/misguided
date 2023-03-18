import { useContext, useEffect, useState } from "react";
import { RiCameraOffFill } from "react-icons/ri";
import FollowContext from "../../context/FollowContext";
import useTimer from "../../hooks/useTimer";
import Trip from "../../models/Trip";
import UserProfile from "../../models/UserProfile";
import { getTripById } from "../../services/tripServices";
import { sortTripsDescending, today } from "../../utils/dateFunctions";
import LoadingCamera from "../common/LoadingCamera";
import FeedCard from "./FeedCard/FeedCard";
import "./FeedPage.css";

interface Props {
  userProfile: UserProfile;
}

const FeedPage = ({ userProfile }: Props) => {
  const { following } = useContext(FollowContext);
  const [friendsPastTrips, setFriendsPastTrips] = useState<string[]>([]);
  const timesUp = useTimer(2000);

  useEffect(() => {
    const trips: Trip[] = [];

    Promise.allSettled(
      following.concat(userProfile).map((user) =>
        Promise.allSettled(
          user.trips.map(
            (trip) =>
              trip.accepted &&
              getTripById(trip.tripId).then((response) => {
                if (response.completed) {
                  if (
                    today.getTime() -
                      (response.endDate
                        ? Number(response.endDate)
                        : Number(response.startDate)) >=
                    0
                  ) {
                    if (!trips.some((trip) => trip._id === response._id)) {
                      trips.push(response);
                    }
                  }
                }
              })
          )
        )
      )
    ).then(() => {
      const sorted: Trip[] = sortTripsDescending(trips);
      setFriendsPastTrips(sorted.map((item) => item._id!));
    });
  }, [following, userProfile]);

  return (
    <section className="FeedPage">
      {!timesUp && <LoadingCamera />}
      {friendsPastTrips.length > 0 ? (
        <ul
          className="feed-container"
          style={{ display: timesUp ? "block" : "none" }}
        >
          {friendsPastTrips.map((tripId) => (
            <FeedCard key={tripId} tripId={tripId} userProfile={userProfile} />
          ))}
        </ul>
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
