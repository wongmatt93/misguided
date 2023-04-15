import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import usePaginate from "../../../hooks/usePaginate";
import useTimer from "../../../hooks/useTimer";
import Trip from "../../../models/Trip";
import UserProfile from "../../../models/UserProfile";
import { getTripsByTripIdArray } from "../../../services/tripServices";
import { today } from "../../../utils/dateFunctions";
import ProfileTripsCluster from "./ProfileTripsCluster";
import "./ProfileTripsContainer.css";

interface Props {
  profile: UserProfile;
  userProfile: UserProfile | undefined;
  setPastTripsCount: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileTripsContainer = ({
  profile,
  userProfile,
  setPastTripsCount,
}: Props) => {
  const [pastTrips, setPastTrips] = useState<Trip[]>([]);
  const [page, setPage] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const paginatedTrips = usePaginate(pastTrips, 9);
  const timesUp: boolean = useTimer(1500);

  useEffect(() => {
    if (profile.tripIds.length > 0) {
      getTripsByTripIdArray(profile.tripIds).then((response) => {
        const past: Trip[] = [];

        response.forEach((item) => {
          if (item.completed) {
            const endDate: Date = item.endDate
              ? new Date(Number(item.endDate))
              : new Date(Number(item.startDate));

            today.getTime() - endDate.getTime() >= 0 && past.push(item);
          }
        });

        setPastTrips(past);
        setPastTripsCount(past.length);
      });
    }
  }, [profile, setPastTripsCount]);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (buttonLoading) {
      interval = setInterval(() => setButtonLoading(false), 1000);
    }

    return () => clearInterval(interval);
  }, [page, buttonLoading]);

  const handleClick = (): void => {
    setButtonLoading(true);
    setPage(page + 1);
  };

  return (
    <>
      <ul className="ProfileTripsContainer">
        {Object.keys(paginatedTrips).map(
          (key, index) =>
            Number(key) <= page && (
              <ProfileTripsCluster
                key={index}
                trips={paginatedTrips[key]}
                userProfile={userProfile}
              />
            )
        )}
      </ul>
      {paginatedTrips[page + 1] ? (
        <Button
          className="centered-bottom"
          style={{ display: timesUp ? "flex" : "none" }}
          variant="link"
          onClick={handleClick}
        >
          {buttonLoading ? "Loading..." : "Load More"}
        </Button>
      ) : (
        page > 0 && (
          <p className="centered-bottom">
            {buttonLoading ? "Loading..." : "You have reached the end"}
          </p>
        )
      )}
    </>
  );
};

export default ProfileTripsContainer;
