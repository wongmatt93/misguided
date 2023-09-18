import { useContext, useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { RiArrowLeftLine } from "react-icons/ri";
import CityContext from "../../../../context/CityContext";
import City from "../../../../models/City";
import CitiesList from "./CitiesList";

import "./CitiesOffcanvas.css";
import CityOverview from "./CityOverview";

interface Props {
  show: boolean;
  handleClose: () => void;
  remainingCities: City[];
  selectedCityId: string;
  setSelectedCityId: React.Dispatch<React.SetStateAction<string>>;
}

const CitiesOffcanvas = ({
  show,
  handleClose,
  remainingCities,
  selectedCityId,
  setSelectedCityId,
}: Props) => {
  // variables
  const { cities } = useContext(CityContext);
  const [city, setCity] = useState<City | undefined>();

  // functions
  useEffect(() => {
    setCity(cities.find((city) => city._id === selectedCityId));
  }, [cities, selectedCityId]);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className="CitiesOffcanvas"
    >
      <Offcanvas.Header closeButton>
        <h1>
          {city ? (
            <>
              <RiArrowLeftLine
                className="back-arrow"
                onClick={() => setSelectedCityId("")}
              />
              {city.cityName.toLowerCase()}
            </>
          ) : (
            "available cities"
          )}
        </h1>
      </Offcanvas.Header>

      {city && <CityOverview city={city} />}

      {!city && (
        <CitiesList
          remainingCities={remainingCities}
          setSelectedCityId={setSelectedCityId}
        />
      )}
    </Offcanvas>
  );
};

export default CitiesOffcanvas;
