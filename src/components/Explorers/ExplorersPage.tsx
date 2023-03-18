import UserProfile from "../../models/UserProfile";
import "./ExplorersPage.css";

interface Props {
  userProfile: UserProfile;
}

const ExplorersPage = ({ userProfile }: Props) => {
  return <section className="ExplorersPage"></section>;
};

export default ExplorersPage;
