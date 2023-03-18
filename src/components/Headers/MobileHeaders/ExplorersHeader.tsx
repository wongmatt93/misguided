import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./ExplorersHeader.css";

const ExplorersHeader = () => {
  const navigate = useNavigate();

  const handleClick = (): void => navigate(`/explorers/search`);

  return (
    <header className="ExplorersHeader">
      <h1>explorers</h1>
      <BiSearch onClick={handleClick} />
    </header>
  );
};

export default ExplorersHeader;
