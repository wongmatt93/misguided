import { useEffect } from "react";
import { getCities } from "../../services/airlabsService";
import AddCityForm from "./AddCityForm";
import "./AddCityPage.css";

const AddCityPage = () => {
  useEffect(() => {
    getCities().then((response) => console.log(response));
  }, []);

  return (
    <main className="AddCityPage">
      <AddCityForm />
    </main>
  );
};

export default AddCityPage;
