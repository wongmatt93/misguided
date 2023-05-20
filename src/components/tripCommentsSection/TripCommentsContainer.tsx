import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { RiMessage2Fill } from "react-icons/ri";
import usePaginate from "../../hooks/usePaginate";
import useTimer from "../../hooks/useTimer";
import { Comment } from "../../models/Trip";
import { sortCommentsDescending } from "../../utils/dateFunctions";
import LoadingSpinner from "../common/LoadingSpinner";
import TripCommentsCluster from "./TripCommentsCluster";
import "./TripCommentsContainer.css";

interface Props {
  tripId: string;
  comments: Comment[];
  refreshTrip: () => Promise<void>;
}

const TripCommentsContainer = ({ tripId, comments, refreshTrip }: Props) => {
  const [page, setPage] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const paginatedComments = usePaginate(sortCommentsDescending(comments), 15);
  const timesUp: boolean = useTimer(800);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (buttonLoading) {
      interval = setInterval(() => setButtonLoading(false), 800);
    }

    return () => clearInterval(interval);
  }, [page, buttonLoading]);

  const handleClick = (): void => {
    setButtonLoading(true);
    setPage(page + 1);
  };

  return (
    <div className="TripCommentsContainer">
      {comments.length > 0 ? (
        <>
          {!timesUp && <LoadingSpinner />}
          <ul style={{ display: timesUp ? "block" : "none" }}>
            {Object.keys(paginatedComments).map(
              (key, index) =>
                Number(key) <= page && (
                  <TripCommentsCluster
                    key={index}
                    tripId={tripId}
                    comments={paginatedComments[key]}
                    refreshTrip={refreshTrip}
                  />
                )
            )}
          </ul>
          {paginatedComments[page + 1] ? (
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
      ) : (
        <div className="empty">
          <RiMessage2Fill />
          <p>Be the first to comment!</p>
        </div>
      )}
    </div>
  );
};

export default TripCommentsContainer;
