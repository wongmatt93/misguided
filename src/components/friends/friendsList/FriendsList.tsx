import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import "./FriendsList.css";
import FriendsContext from "../../../context/FollowContext";
import AcceptedFriendsList from "./AcceptedFriendsList";

const FriendsList = () => {
  const { friends } = useContext(FriendsContext);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="FriendsList">
      <Form>
        <Form.Group controlId="email">
          <Form.Control
            type="email"
            placeholder="Search friends"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
      </Form>
      <AcceptedFriendsList friends={friends} searchTerm={searchTerm} />
    </div>
  );
};

export default FriendsList;
