import { useContext, useState } from "react";
import { Button } from "react-bootstrap";

import CityContext from "../../../context/CityContext";
import City from "../../../models/City";
import CitiesOffcanvas from "../Offcanvases/Cities/CitiesOffcanvas";
import FavoriteCityCard from "./FavoriteCityCard";
import "./Planning.css";

interface Props {
  hometownId: string;
  favoriteCityIds: string[];
  hiddenCityIds: string[];
}

const Planning = ({ hometownId, favoriteCityIds, hiddenCityIds }: Props) => {
  // hooks
  const { cities } = useContext(CityContext);
  const [show, setShow] = useState<boolean>(false);
  const [selectedCityId, setSelectedCityId] = useState<string>("");

  // variables
  const favoriteCities: City[] = [];
  const remainingCities: City[] = [];

  // functions
  cities.forEach((city) => {
    if (city._id === hometownId) {
      favoriteCities.unshift(city);
    } else if (favoriteCityIds.includes(city._id!)) {
      favoriteCities.push(city);
    } else if (!hiddenCityIds.includes(city._id!)) {
      remainingCities.push(city);
    }
  });

  const handleClose = (): void => setShow(false);
  const handleShow = (id: string): void => {
    setSelectedCityId(id);
    setShow(true);
  };

  return (
    <section className="Planning">
      <ul className="favorite-city-list">
        {favoriteCities.map((city) => (
          <FavoriteCityCard
            key={city._id}
            city={city}
            handleShow={() => handleShow(city._id!)}
          />
        ))}
      </ul>
      <div className="discover-text">
        <p>Don't see a city you like? </p>
        <p>Discover new cities!</p>
        <Button
          className="discover-button"
          variant="warning"
          onClick={() => handleShow("")}
        >
          Discover
        </Button>
      </div>
      <CitiesOffcanvas
        show={show}
        handleClose={handleClose}
        remainingCities={remainingCities}
        selectedCityId={selectedCityId}
        setSelectedCityId={setSelectedCityId}
      />
    </section>
  );
};

export default Planning;
