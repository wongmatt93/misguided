import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FavoritesContainer from "./favorites/FavoritesContainer";
import "./PlanTripPage.css";

const PlanTripPage = () => {
  const navigate = useNavigate();

  const handleClick = (): void => navigate("/discover");

  return (
    <>
      <header className="PlanTripPage-header">
        <h1>Begin Trip Planning</h1>
      </header>
      <main className="PlanTripPage-main">
        <p>Don't see a city you like? Discover new cities!</p>
        <Button
          className="discover-button"
          variant="warning"
          onClick={handleClick}
        >
          Discover
        </Button>
        <FavoritesContainer />
      </main>
    </>
  );
};

export default PlanTripPage;
