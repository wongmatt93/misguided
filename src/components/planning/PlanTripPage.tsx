import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserProfile from "../../models/UserProfile";
import FavoritesContainer from "./Favorites/FavoritesContainer";
import "./PlanTripPage.css";

interface Props {
  userProfile: UserProfile;
}

const PlanTripPage = ({ userProfile }: Props) => {
  const navigate = useNavigate();

  const handleClick = (): void => navigate("/plan-trip/discover");

  return (
    <section className="PlanTripPage">
      <FavoritesContainer userProfile={userProfile} />
      <div className="discover-text">
        <p>Don't see a city you like? Discover new cities!</p>
        <Button
          className="discover-button"
          variant="warning"
          onClick={handleClick}
        >
          Discover
        </Button>
      </div>
    </section>
  );
};

export default PlanTripPage;
