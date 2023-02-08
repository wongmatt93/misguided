import UserProfile from "../../../models/UserProfile";
import AcceptedFriendCard from "./AcceptedFriendCard";
import "./AcceptedFriendsList.css";

interface Props {
  friends: UserProfile[];
  searchTerm: string;
}

const AcceptedFriendsList = ({ friends, searchTerm }: Props) => {
  return (
    <section className="AcceptedFriendsList">
      <h2>Friends</h2>
      <ul>
        {friends
          .filter((friend) =>
            friend.displayName!.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((friend) => (
            <AcceptedFriendCard key={friend.uid} friend={friend} />
          ))}
      </ul>
    </section>
  );
};

export default AcceptedFriendsList;
