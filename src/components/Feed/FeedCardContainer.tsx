import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import usePaginate from "../../hooks/usePaginate";
import ActiveUserProfile from "../../models/UserProfile";
import "./FeedCardContainer.css";
import FeedCluster from "./FeedCluster";

interface Props {
  tripIds: string[];
  userProfile: ActiveUserProfile;
  timesUp: boolean;
}

const FeedCardContainer = ({ tripIds, userProfile, timesUp }: Props) => {
  const [page, setPage] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const paginatedTrips = usePaginate(tripIds, 10);

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
      <ul
        className="FeedCardContainer"
        style={{ display: timesUp ? "block" : "none" }}
      >
        {Object.keys(paginatedTrips).map(
          (key, index) =>
            Number(key) <= page && (
              <FeedCluster
                key={index}
                tripIds={paginatedTrips[key]}
                userProfile={userProfile}
              />
            )
        )}
      </ul>
      {paginatedTrips[page + 1] ? (
        <Button
          className="feed-button centered-bottom"
          style={{ display: timesUp ? "flex" : "none" }}
          variant="link"
          onClick={handleClick}
        >
          {buttonLoading ? "Loading..." : "Load More"}
        </Button>
      ) : (
        page > 0 && (
          <p className="feed-button centered-bottom">
            {buttonLoading ? "Loading..." : "You have reached the end"}
          </p>
        )
      )}
    </>
  );
};

export default FeedCardContainer;
