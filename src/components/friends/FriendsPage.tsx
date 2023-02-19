import { useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FollowContext from "../../context/FollowContext";
import FriendsList from "./friendsList/FriendsList";
import "./FriendsPage.css";

const FriendsPage = () => {
  const { activeKey, setFeedKey, setFriendsKey, setSearchKey } =
    useContext(FollowContext);

  return (
    <main className="FriendsPage">
      <Tabs defaultActiveKey={activeKey} variant="pills" justify>
        <Tab eventKey="friends" title="Friends" onClick={setFriendsKey}>
          <FriendsList />
        </Tab>
      </Tabs>
    </main>
  );
};

export default FriendsPage;
