import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { signOut } from "../../firebaseConfig";
import "./UserProfilePage.css";

const UserProfilePage = () => {
  const { setUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const signOutAction = (): void => {
    signOut();
    setUserProfile(undefined);
  };

  const addCityNavigate = (): void => {
    navigate("/add-city");
  };

  return (
    <main className="UserProfilePage">
      <button onClick={signOutAction}>Sign out</button>
      <button onClick={addCityNavigate}>Add Cities</button>
    </main>
  );
};

export default UserProfilePage;
