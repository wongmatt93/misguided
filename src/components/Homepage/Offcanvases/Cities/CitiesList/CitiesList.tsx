import City from "../../../../../models/City";
import "./CitiesList.css";
import CityCard from "./CityCard";

interface Props {
  remainingCities: City[];
  setSelectedCityId: React.Dispatch<React.SetStateAction<string>>;
}

const CitiesList = ({ remainingCities, setSelectedCityId }: Props) => {
  return (
    <ul className="CitiesList">
      {remainingCities.map((city) => (
        <CityCard
          key={city._id}
          city={city}
          setSelectedCityId={setSelectedCityId}
        />
      ))}
    </ul>
  );
};

export default CitiesList;
