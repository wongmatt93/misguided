import UserProfile from "../../../models/UserProfile";
import "./MessagesSection.css";

interface Props {
  userProfile: UserProfile;
}

const MessagesSection = ({ userProfile }: Props) => {
  return (
    <section className="MessagesSection">
      <h3>Messages</h3>
    </section>
  );
};

export default MessagesSection;
