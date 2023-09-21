import { Navigate, Route, Routes } from "react-router-dom";
import { NewUserTemplate } from "../../models/UserProfile";
import NewUserInformationSection from "./NewUserInformationSection";
import "./Welcome.css";

interface Props {
  firstTimeUser: NewUserTemplate;
  refreshProfile: () => Promise<void>;
}

const Welcome = ({ firstTimeUser, refreshProfile }: Props) => {
  return (
    <div className="Welcome">
      <Routes>
        <Route
          index
          element={
            <NewUserInformationSection
              firstTimeUser={firstTimeUser}
              refreshProfile={refreshProfile}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default Welcome;
