import { Route, Routes } from "react-router-dom";
import AddCityPage from "./Admin/AddCityPage";
import AccountInformationPage from "./AccountInformation/AccountInformationPage";
import NotificationsSettingsPage from "./Notifications/NotificationsSettingsPage";
import PreferencesPage from "./Preferences/PreferencesPage";
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
