import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import UserProfile from "../models/UserProfile";
import { getUserByUid } from "../services/userService";
import Trip from "../models/Trip";
import { today } from "../utils/dateFunctions";
import { getAcceptedTrips } from "../utils/userFunctions";

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [firstTimeUser, setFirstTimeUser] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(
    undefined
  );
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

  const refreshProfile = async (): Promise<void> =>
    setUserProfile(await getUserByUid(userProfile!.uid));

  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      //setUserProfile(users.find((user) => user.email === newUser!.email));
      if (newUser) {
        getUserByUid(newUser.uid).then((response) => {
          if (!response) {
            const newUserProfile: UserProfile = {
              uid: newUser.uid,
              username: null,
              displayName: newUser.displayName,
              email: newUser.email,
              phoneNumber: newUser.phoneNumber,
              photoURL: null,
              hometownId: null,
              preferences: null,
              followersUids: [],
              followingUids: [],
              favoriteCityIds: [],
              hiddenCityIds: [],
              tripIds: [],
              notifications: [],
              likedTripIds: [],
              commentedTripIds: [],
              visitedCityIds: [],
            };
            setUserProfile(newUserProfile);
            setFirstTimeUser(true);
          } else {
            setUserProfile(response);
            if (response.tripIds.length > 0) {
              getAcceptedTrips(response).then((trips) => {
                if (trips.length > 0) {
                  for (let i = 0; i < trips.length; i++) {
                    if (
                      Number(today) >= Number(trips[i].startDate) &&
                      Number(trips[i].endDate) >= Number(today)
                    ) {
                      setCurrentTrip(trips[i]);
                      break;
                    }
                  }
                }
              });
            }
          }
        });
      }
    });
  }, []);

  // useEffect(() => {
  //   if (!firstTimeUser && userProfile) {
  //     const interval = setInterval(() => {
  //       getUserByUid(userProfile.uid).then(
  //         (response) =>
  //           JSON.stringify(response) !== JSON.stringify(userProfile) &&
  //           setUserProfile(response)
  //       );
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [firstTimeUser, userProfile]);

  return (
    <AuthContext.Provider
      value={{
        firstTimeUser,
        setFirstTimeUser,
        userProfile,
        setUserProfile,
        refreshProfile,
        currentTrip,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
