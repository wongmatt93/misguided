import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import ActiveUserProfile from "../models/UserProfile";
import { getUserProfile } from "../services/userService";
import Trip from "../models/Trip";
import { today } from "../utils/dateFunctions";

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [firstTimeUser, setFirstTimeUser] = useState(false);
  const [userProfile, setUserProfile] = useState<ActiveUserProfile | undefined>(
    undefined
  );
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const currentDateString = today.getTime().toString();

  const refreshProfile = async (): Promise<void> =>
    setUserProfile(await getUserProfile(userProfile!.uid, currentDateString));

  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      //setUserProfile(users.find((user) => user.email === newUser!.email));
      if (newUser) {
        getUserProfile(newUser.uid, currentDateString).then(
          (activeUserProfile) => {
            if (!activeUserProfile) {
              const newUserProfile: ActiveUserProfile = {
                uid: newUser.uid,
                username: null,
                displayName: newUser.displayName,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                photoURL: null,
                hometownId: null,
                preferences: null,
                followingUserProfiles: [],
                followerUserProfiles: [],
                upcomingTrips: [],
                pastTrips: [],
                favoriteCityIds: [],
                hiddenCityIds: [],
                notifications: [],
                visitedCityIds: [],
              };

              setUserProfile(newUserProfile);
              setFirstTimeUser(true);
            } else {
              setUserProfile(activeUserProfile);
              const { uid, upcomingTrips } = activeUserProfile;

              const acceptedTrips: Trip[] = upcomingTrips.filter((trip) =>
                trip.participants.some(
                  (participant) =>
                    participant.uid === uid && participant.accepted
                )
              );

              if (acceptedTrips.length > 0) {
                for (let i = 0; i < acceptedTrips.length; i++) {
                  if (
                    Number(today) >= Number(acceptedTrips[i].startDate) &&
                    Number(acceptedTrips[i].endDate) >= Number(today)
                  ) {
                    setCurrentTrip(acceptedTrips[i]);
                    break;
                  }
                }
              }
            }
          }
        );
      }
    });
  }, [currentDateString]);

  // useEffect(() => {
  //   if (!firstTimeUser && userProfile) {
  //     const interval = setInterval(() => {
  //       getUserByUid(userProfile.uid).then(
  //         (activeUserProfile) =>
  //           JSON.stringify(activeUserProfile) !== JSON.stringify(userProfile) &&
  //           setUserProfile(activeUserProfile)
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
