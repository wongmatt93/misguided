import UserProfile from "../../models/UserProfile";
import FriendRequestCard from "./FriendRequestCard";
import "./FriendRequestList.css";

interface Props {
  friendRequests: UserProfile[];
  searchTerm: string;
}

const FriendRequestList = ({ friendRequests, searchTerm }: Props) => {
  return (
    <section className="FriendRequestList">
      <h2>Friend Requests ({friendRequests.length})</h2>
      <ul>
        {friendRequests
          .filter((request) =>
            request
              .displayName!.toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map((request) => (
            <FriendRequestCard key={request.uid} request={request} />
          ))}
      </ul>
    </section>
  );
};

export default FriendRequestList;
