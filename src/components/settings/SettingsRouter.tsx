import { Route, Routes } from "react-router-dom";
import AddCityPage from "./admin/AddCityPage";
import AccountInformationPage from "./accountInformation/AccountInformationPage";
import NotificationsSettingsPage from "./notifications/NotificationsSettingsPage";
import PreferencesPage from "./preferences/PreferencesPage";
import SettingsPage from "./SettingsPage";

const SettingsRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<SettingsPage />} />
        <Route path="/account" element={<AccountInformationPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/notifications" element={<NotificationsSettingsPage />} />
        <Route path="/add-city" element={<AddCityPage />} />
      </Routes>
    </>
  );
};

export default SettingsRouter;
