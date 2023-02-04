import { useContext, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { RiUserSearchLine } from "react-icons/ri";
import AuthContext from "../../context/AuthContext";
import FriendsFeed from "./FriendsFeed";
import FriendsList from "./FriendsList";

import "./FriendsPage.css";
import SearchUsers from "./SearchUsers";

const FriendsPage = () => {
  const { activeKey, setFriendsKey, setSearchKey } = useContext(AuthContext);

  return (
    <main className="FriendsPage">
      <Tabs defaultActiveKey={activeKey} justify>
        <Tab eventKey="feed" title="Feed">
          <FriendsFeed />
        </Tab>
        <Tab eventKey="friends" title="Friends" onClick={setFriendsKey}>
          <FriendsList />
        </Tab>
        <Tab
          eventKey="search"
          title={<RiUserSearchLine />}
          onClick={setSearchKey}
        >
          <SearchUsers />
        </Tab>
      </Tabs>
    </main>
  );
};

export default FriendsPage;
