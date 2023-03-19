import { useEffect, useState } from "react";
import { RiCameraOffFill } from "react-icons/ri";
import useTimer from "../../hooks/useTimer";
import Trip from "../../models/Trip";
import UserProfile from "../../models/UserProfile";
import { getTripById } from "../../services/tripServices";
import { getAllUsersByUidArray } from "../../services/userService";
import { sortTripsDescending, today } from "../../utils/dateFunctions";
import LoadingCamera from "../common/LoadingCamera";
import FeedCard from "./FeedCard/FeedCard";
import "./FeedPage.css";

interface Props {
  userProfile: UserProfile;
}

const FeedPage = ({ userProfile }: Props) => {
  const [feedTrips, setFeedTrips] = useState<string[]>([]);
  const timesUp = useTimer(2000);

  useEffect(() => {
    const trips: Trip[] = [];

    getAllUsersByUidArray(
      userProfile.followingUids.concat(userProfile.uid)
    ).then((response) => {
      Promise.allSettled(
        response.map((user) =>
          Promise.allSettled(
            user.trips.map(
              (trip) =>
                trip.accepted &&
                getTripById(trip.tripId).then(
                  (response) =>
                    response.completed &&
                    today.getTime() -
                      (response.endDate
                        ? Number(response.endDate)
                        : Number(response.startDate)) >=
                      0 &&
                    !trips.some((trip) => trip._id === response._id) &&
                    trips.push(response)
                )
            )
          )
        )
      ).then(() => {
        setFeedTrips(sortTripsDescending(trips).map((item) => item._id!));
      });
    });
  }, [userProfile]);

  return (
    <section className="FeedPage">
      {!timesUp && <LoadingCamera />}
      {feedTrips.length > 0 ? (
        <ul
          className="feed-container"
          style={{ display: timesUp ? "block" : "none" }}
        >
          {feedTrips.map((tripId) => (
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
