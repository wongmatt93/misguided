import { useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FriendsContext from "../../context/FriendsContext";
import FriendsFeed from "./FriendsFeed";
import FriendsList from "./FriendsList";

import "./FriendsPage.css";
import SearchUsers from "./SearchUsers";

const FriendsPage = () => {
  const { activeKey, setFriendsKey, setSearchKey } = useContext(FriendsContext);

  return (
    <main className="FriendsPage">
      <Tabs defaultActiveKey={activeKey} variant="pills" justify>
        <Tab eventKey="feed" title="Feed">
          <FriendsFeed />
        </Tab>
        <Tab eventKey="friends" title="Friends" onClick={setFriendsKey}>
          <FriendsList />
        </Tab>
        <Tab eventKey="search" title="Search" onClick={setSearchKey}>
          <SearchUsers />
        </Tab>
      </Tabs>
    </main>
  );
};

export default FriendsPage;
