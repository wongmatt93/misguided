import { useEffect, useState } from "react";
import UserProfile, { Notification } from "../../../models/UserProfile";
import { sortNotifications } from "../../../utils/dateFunctions";
import "./InboxNotificationsContainer.css";
import { ListGroup, Button } from "react-bootstrap/";
import { RiMailCloseFill } from "react-icons/ri";
import usePaginate from "../../../hooks/usePaginate";
import InboxNotificationsCluster from "./InboxNotificationsCluster";
import useTimer from "../../../hooks/useTimer";
import LoadingSpinner from "../../common/LoadingSpinner";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const InboxNotificationsContainer = ({
  userProfile,
  refreshProfile,
}: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const paginatedNotifs = usePaginate(notifications, 15);
  const timesUp: boolean = useTimer(1000);

  useEffect(() => {
    setNotifications(
      sortNotifications(
        userProfile.notifications.filter(
          (notif) => notif.type !== "tripMessage"
        )
      )
    );
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
    <section className="InboxNotificationsContainer">
      {notifications.length > 0 ? (
        <>
          {!timesUp && <LoadingSpinner />}
          <ListGroup
            variant="flush"
            style={{ display: timesUp ? "block" : "none" }}
          >
            {Object.keys(paginatedNotifs).map(
              (key, index) =>
                Number(key) <= page && (
                  <InboxNotificationsCluster
                    key={index}
                    notifications={paginatedNotifs[key]}
                    uid={userProfile.uid}
                    refreshProfile={refreshProfile}
                  />
                )
            )}
          </ListGroup>
          {paginatedNotifs[page + 1] ? (
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
      ) : !timesUp ? (
        <LoadingSpinner />
      ) : (
        <div className="empty">
          <RiMailCloseFill />
          <p>No Notifications</p>
        </div>
      )}
    </section>
  );
};

export default InboxNotificationsContainer;
