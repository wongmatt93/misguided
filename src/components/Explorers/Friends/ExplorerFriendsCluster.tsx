import UserProfile from "../../../models/UserProfile";
import ExplorerFriendCard from "./ExplorerFriendCard";

interface Props {
  friends: UserProfile[];
}

const ExplorerFriendsCluster = ({ friends }: Props) => {
  return (
    <>
      {friends.map((friend) => (
        <ExplorerFriendCard key={friend.uid} friend={friend} />
      ))}
    </>
  );
};

export default ExplorerFriendsCluster;
