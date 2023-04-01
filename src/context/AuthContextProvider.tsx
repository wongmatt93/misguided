import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import UserProfile from "../models/UserProfile";
import { getUserByUid } from "../services/userService";
import Trip from "../models/Trip";
import { getTripsByTripIdArray } from "../services/tripServices";
import { today } from "../utils/dateFunctions";

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
              likesCityIds: [],
              dislikesCityIds: [],
              trips: [],
              notifications: [],
            };
            setUserProfile(newUserProfile);
            setFirstTimeUser(true);
          } else {
            setUserProfile(response);
            const userAcceptedTrips: string[] = response.trips
              .filter((trip) => trip.accepted)
              .map((acceptedTrip) => acceptedTrip.tripId);

            if (userAcceptedTrips.length > 0) {
              getTripsByTripIdArray(userAcceptedTrips).then((response) => {
                for (let i = 0; i < response.length; i++) {
                  if (
                    Number(today) >= Number(response[i].startDate) &&
                    Number(response[i].endDate) >= Number(today)
                  ) {
                    setCurrentTrip(response[i]);
                    break;
                  }
                }
              });
            }
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!firstTimeUser && userProfile) {
      const interval = setInterval(() => {
        getUserByUid(userProfile.uid).then((response) => {
          const array1: string = response.notifications.toString();
          const array2: string = userProfile.notifications.toString();

          if (array1 !== array2) {
            setUserProfile(response);
          }
        });
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [firstTimeUser, userProfile]);

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
