import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import UserProfile from "../models/UserProfile";
import { getUserByUid, getUserFollowers } from "../services/userService";
import Trip from "../models/Trip";
import { today } from "../utils/dateFunctions";
import { getPastTrips, getUpcomingTrips } from "../services/tripServices";

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [firstTimeUser, setFirstTimeUser] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(
    undefined
  );
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  const [pastTrips, setPastTrips] = useState<Trip[]>([]);
  const [followers, setFollowers] = useState<UserProfile[]>([]);

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
              followingUids: [],
              favoriteCityIds: [],
              hiddenCityIds: [],
              notifications: [],
              visitedCityIds: [],
            };
            setUserProfile(newUserProfile);
            setFirstTimeUser(true);
          } else {
            setUserProfile(response);
            const { uid } = response;

            getPastTrips(uid, today.getTime().toString()).then((trips) =>
              setPastTrips(trips)
            );

            getUpcomingTrips(uid, today.getTime().toString()).then((trips) => {
              const acceptedTrips: Trip[] = trips.filter((trip) =>
                trip.participants.some(
                  (participant) =>
                    participant.uid === uid && participant.accepted
                )
              );

              setUpcomingTrips(acceptedTrips);
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

            getUserFollowers(uid).then((followers) => setFollowers(followers));
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
        upcomingTrips,
        setUpcomingTrips,
        pastTrips,
        followers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
