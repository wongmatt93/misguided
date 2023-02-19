import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FavoritesContainer from "./favorites/FavoritesContainer";
import "./PlanTripPage.css";

const PlanTripPage = () => {
  const navigate = useNavigate();

  const handleClick = (): void => navigate("/discover");

  return (
    <>
      <header>
        <h2>Pick a city to begin planning your trip</h2>
        <p>Don't see a city you like? Discover new cities!</p>
        <Button
          className="discover-button"
          variant="warning"
          onClick={handleClick}
        >
          Discover
        </Button>
      </header>

      <FavoritesContainer />
    </>
  );
};

export default PlanTripPage;
