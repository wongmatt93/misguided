import { Route, Routes } from "react-router-dom";
import InitialVisit from "./InitialVisit";
import "./RatingPage.css";
import SubsequentVisit from "./SubsequentVisit";

const RatingPage = () => {
  return (
    <>
      <header>
        <h1>Rate this City</h1>
      </header>
      <Routes>
        <Route index element={<InitialVisit />} />
        <Route path="/subsequent" element={<SubsequentVisit />} />
      </Routes>
    </>
  );
};

export default RatingPage;
