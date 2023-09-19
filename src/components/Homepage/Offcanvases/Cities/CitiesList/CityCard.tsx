import { RiArrowRightSLine } from "react-icons/ri";

import City from "../../../../../models/City";
import "./CityCard.css";

interface Props {
  city: City;
  setSelectedCityId: React.Dispatch<React.SetStateAction<string>>;
}

const CityCard = ({ city, setSelectedCityId }: Props) => {
  // variables
  const imagePath: string =
    process.env.PUBLIC_URL + `/assets/cities/${city.photoURL}`;

  return (
    <li className="CityCard" onClick={() => setSelectedCityId(city._id!)}>
      <div className="photo-name-container">
        <img src={imagePath} alt={city.cityName} />
        <p>{city.cityName}</p>
      </div>
      <RiArrowRightSLine />
    </li>
  );
};

export default CityCard;
