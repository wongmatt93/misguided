import { Route, Routes } from "react-router-dom";
import AccountInformationPage from "./accountInformation/AccountInformationPage";
import PreferencesPage from "./preferences/PreferencesPage";
import SettingsPage from "./SettingsPage";

const SettingsRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<SettingsPage />} />
        <Route path="/account" element={<AccountInformationPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
      </Routes>
    </>
  );
};

export default SettingsRouter;
