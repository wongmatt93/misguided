import { useEffect } from "react";
import { getCities } from "../../../../../services/airlabsService";
import AddCityForm from "./AddCityForm";
import "./AddCitySection.css";

const AddCitySection = () => {
  useEffect(() => {
    getCities().then((response) => console.log(response));
  }, []);

  return (
    <main className="AddCitySection">
      <AddCityForm />
    </main>
  );
};

export default AddCitySection;
