import { Route, Routes } from "react-router-dom";
import UserProfile from "../../models/UserProfile";
import ProfilePage from "../Profile/ProfilePage";
import SearchPage from "./SearchPage";

interface Props {
  userProfile: UserProfile;
}

const SearchRouter = ({ userProfile }: Props) => {
  return (
    <Routes>
      <Route index element={<SearchPage userProfile={userProfile} />} />
      <Route path="/profile/:uid" element={<ProfilePage />} />
    </Routes>
  );
};

export default SearchRouter;
