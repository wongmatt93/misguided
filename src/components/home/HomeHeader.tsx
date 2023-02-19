import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./HomeHeader.css";

const HomeHeader = () => {
  const navigate = useNavigate();

  const handleClick = (): void => navigate(`/search`);

  return (
    <header className="HomeHeader">
      <h1>misguided</h1>
      <BiSearch onClick={handleClick} />
    </header>
  );
};

export default HomeHeader;
