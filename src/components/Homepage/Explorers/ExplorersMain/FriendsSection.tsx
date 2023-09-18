import { UserSummary } from "../../../../models/UserProfile";
import FriendCard from "./FriendCard";
import "./FriendsSection.css";

interface Props {
  friends: UserSummary[];
}

const FriendsSection = ({ friends }: Props) => {
  return (
    <section className="FriendsSection">
      <h2>Friends</h2>
      <ul>
        {friends.map((friend) => (
          <FriendCard key={friend.uid} friend={friend} />
        ))}
      </ul>
    </section>
  );
};

export default FriendsSection;
