import { useEffect, useState } from "react";
import Trip, { Message } from "../../../models/Trip";
import UserProfile from "../../../models/UserProfile";
import { getTripsByTripIdArray } from "../../../services/tripServices";
import "./InboxMessagesContainer.css";
import ListGroup from "react-bootstrap/ListGroup";
import { RiChatDeleteFill } from "react-icons/ri";
import usePaginate from "../../../hooks/usePaginate";
import useTimer from "../../../hooks/useTimer";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Button } from "react-bootstrap";
import InboxMessagesCluster from "./InboxMessagesCluster";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const InboxMessagesContainer = ({ userProfile, refreshProfile }: Props) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [page, setPage] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const paginatedTrips = usePaginate(trips, 15);
  const timesUp: boolean = useTimer(1000);

  useEffect(() => {
    const { tripIds } = userProfile;
    if (tripIds.length > 0) {
      getTripsByTripIdArray(tripIds).then((response) => {
        const initialArray: Trip[] = response.filter(
          (trip) => trip.participants.length > 1
        );

        const hasMessages: Trip[] = [];
        const noMessages: Trip[] = [];

        initialArray.forEach((trip) =>
          trip.messages.length > 0
            ? hasMessages.push(trip)
            : noMessages.push(trip)
        );

        hasMessages.sort(function (a, b) {
          const aLatestMessage: Message | undefined =
            a.messages[a.messages.length - 1];
          const bLatestMessage: Message | undefined =
            b.messages[b.messages.length - 1];

          if (aLatestMessage!.date > bLatestMessage!.date) {
            return -1;
          } else {
            return 1;
          }
        });

        setTrips([...hasMessages, ...noMessages]);
      });
    }
  }, [userProfile]);

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
    <section className="InboxMessagesContainer">
      {trips.length > 0 ? (
        <>
          {!timesUp && <LoadingSpinner />}
          <ListGroup
            variant="flush"
            style={{ display: timesUp ? "flex" : "none" }}
          >
            {Object.keys(paginatedTrips).map(
              (key, index) =>
                Number(key) <= page && (
                  <InboxMessagesCluster
                    key={index}
                    trips={paginatedTrips[key]}
                    userProfile={userProfile}
                    refreshProfile={refreshProfile}
                  />
                )
            )}
          </ListGroup>
          {paginatedTrips[page + 1] ? (
            <Button
              className="centered-bottom"
              style={{ display: timesUp ? "block" : "none" }}
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
      ) : !timesUp ? (
        <LoadingSpinner />
      ) : (
        <div className="empty">
          <RiChatDeleteFill />
          <p>No Messages</p>
        </div>
      )}
    </section>
  );
};

export default InboxMessagesContainer;
