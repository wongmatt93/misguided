import { Route, Routes } from "react-router-dom";
import AddCityPage from "./Admin/AddCityPage";
import AccountInformationPage from "./AccountInformation/AccountInformationPage";
import NotificationsSettingsPage from "./Notifications/NotificationsSettingsPage";
import PreferencesPage from "./Preferences/PreferencesPage";
import SettingsPage from "./SettingsPage";
import UserProfile from "../../models/UserProfile";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const SettingsRouter = ({ userProfile, refreshProfile }: Props) => {
  return (
    <>
      <Routes>
        <Route index element={<SettingsPage userProfile={userProfile} />} />
        <Route
          path="/account"
          element={
            <AccountInformationPage
              userProfile={userProfile}
              refreshProfile={refreshProfile}
            />
          }
        />
        <Route
          path="/preferences"
          element={
            <PreferencesPage
              userProfile={userProfile}
              refreshProfile={refreshProfile}
            />
          }
        />
        <Route path="/notifications" element={<NotificationsSettingsPage />} />
        <Route path="/add-city" element={<AddCityPage />} />
      </Routes>
    </>
  );
};

export default SettingsRouter;
