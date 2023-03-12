import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FavoritesContainer from "./favorites/FavoritesContainer";
import "./PlanTripPage.css";

const PlanTripPage = () => {
  const navigate = useNavigate();

  const handleClick = (): void => navigate("/discover");

  return (
    <section className="PlanTripPage">
      <FavoritesContainer />
      <div className="discover">
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
