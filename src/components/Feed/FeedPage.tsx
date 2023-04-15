import { useEffect, useState } from "react";
import { RiCameraOffFill } from "react-icons/ri";
import useTimer from "../../hooks/useTimer";
import Trip from "../../models/Trip";
import UserProfile from "../../models/UserProfile";
import { getTripById } from "../../services/tripServices";
import { getAllUsersByUidArray } from "../../services/userService";
import { sortTripsDescending, today } from "../../utils/dateFunctions";
import LoadingCamera from "../common/LoadingCamera";
import FeedCardContainer from "./FeedCardContainer";
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
    ).then((users) =>
      Promise.allSettled(
        users.map((user) =>
          Promise.allSettled(
            user.tripIds.map((tripId) =>
              getTripById(tripId).then(
                (trip) =>
                  trip.completed &&
                  trip.participants.some(
                    (participant) =>
                      participant.uid === user.uid && participant.accepted
                  ) &&
                  today.getTime() -
                    (trip.endDate
                      ? Number(trip.endDate)
                      : Number(trip.startDate)) >=
                    0 &&
                  !trips.some((item) => item._id! === trip._id!) &&
                  trips.push(trip)
              )
            )
          )
        )
      ).then(() => {
        setFeedTrips(sortTripsDescending(trips).map((item) => item._id!));
      })
    );
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
