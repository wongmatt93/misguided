import { useState } from "react";
import { Button } from "react-bootstrap";
import usePaginate from "../../../hooks/usePaginate";
import useTimer from "../../../hooks/useTimer";
import UserProfile from "../../../models/UserProfile";
import ExplorerFriendsCluster from "./ExplorerFriendsCluster";
import "./ExplorerFriendsSection.css";

interface Props {
  friends: UserProfile[];
}

const ExplorerFriendsSection = ({ friends }: Props) => {
  const [page, setPage] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const paginatedFriends = usePaginate(friends, 10);
  const timesUp: boolean = useTimer(800);

  const handleClick = (): void => {
    setButtonLoading(true);
    setPage(page + 1);
  };

  return (
    <section className="ExplorerFriendsSection">
      <h2>friends</h2>
      <ul>
        {Object.keys(paginatedFriends).map(
          (key, index) =>
            Number(key) <= page && (
              <ExplorerFriendsCluster
                key={index}
                friends={paginatedFriends[key]}
              />
            )
        )}
      </ul>
      {paginatedFriends[page + 1] ? (
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
    </section>
  );
};

export default ExplorerFriendsSection;
