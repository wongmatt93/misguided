import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import usePaginate from "../../../hooks/usePaginate";
import useTimer from "../../../hooks/useTimer";
import { Trip } from "../../../models/Trip";
import FullUserProfile from "../../../models/UserProfile";
import ProfileTripsCluster from "./ProfileTripsCluster";
import "./ProfileTripsContainer.css";

interface Props {
  profile: FullUserProfile;
  userProfile: FullUserProfile | undefined;
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
    const { pastTrips } = profile;
    const completedTrips: Trip[] = pastTrips.filter((trip) => trip.completed);
    setPastTrips(completedTrips);
    setPastTripsCount(completedTrips.length);
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
