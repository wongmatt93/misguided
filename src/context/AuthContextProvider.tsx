import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import UserProfile from "../models/UserProfile";
import { addNewUser, getUserByUid } from "../services/userService";
import Trip from "../models/Trip";
import { getTripsByTripIdArray } from "../services/tripServices";

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(
    undefined
  );
  const [userTrips, setUserTrips] = useState<Trip[]>([]);

  const getAllUserTrips = (userProfile: UserProfile) => {
    const tripIds: string[] = [];

    userProfile.trips.forEach((trip) => tripIds.push(trip.tripId));

    getTripsByTripIdArray(tripIds).then((response) => setUserTrips(response));
  };

  const refreshProfile = (uid: string): Promise<void> =>
    getUserByUid(uid).then((response) => {
      setUserProfile(response);
      if (response.trips.length > 0) {
        getAllUserTrips(response);
      } else {
        setUserTrips([]);
      }
    });

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
              followers: [],
              following: [],
              likes: [],
              dislikes: [],
              trips: [],
              notifications: [],
            };
            addNewUser(newUserProfile);
            setUserProfile(newUserProfile);
            if (newUserProfile.trips.length > 0) {
              getAllUserTrips(newUserProfile);
            }
          } else {
            setUserProfile(response);
            if (response.trips.length > 0) {
              getAllUserTrips(response);
            }
          }
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        userTrips,
        setUserProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
