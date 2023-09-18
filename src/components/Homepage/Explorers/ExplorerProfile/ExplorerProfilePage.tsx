import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Trip } from "../../../../models/Trip";
import { UserProfile } from "../../../../models/UserProfile";
import { getUserProfileByUid } from "../../../../services/userProfileServices";
import {
  getCurrentDateString,
  sortTripsDescending,
} from "../../../../utils/dateFunctions";
import ExplorerProfileInfo from "./ExplorerProfileInfo";
import "./ExplorerProfilePage.css";
import ExplorerProfileTrips from "./ExplorerProfileTrips";

interface Props {
  uid: string;
  refreshProfile: () => Promise<void>;
}

const ExplorerProfilePage = ({ uid, refreshProfile }: Props) => {
  // variables
  const profileUid: string | undefined = useParams().uid;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  let completedTrips: Trip[] =
    profile?.pastTrips.filter((trip) => trip.completed) || [];

  // functions
  const refreshProfilePage = async (uid: string): Promise<void> => {
    setProfile(await getUserProfileByUid(uid, getCurrentDateString));
  };

  useEffect(() => {
    profileUid &&
      getUserProfileByUid(profileUid, getCurrentDateString).then((response) =>
        setProfile(response)
      );
  }, [profileUid]);

  return (
    <div className="ExplorerProfilePage">
      {profileUid && profile && (
        <>
          <ExplorerProfileInfo
            uid={uid}
            profile={profile}
            completedTripsCount={completedTrips.length}
            refreshProfile={refreshProfile}
            refreshProfilePage={() => refreshProfilePage(profileUid)}
          />
          <ExplorerProfileTrips
            uid={uid}
            completedTrips={sortTripsDescending(completedTrips)}
          />
        </>
      )}
    </div>
  );
};

export default ExplorerProfilePage;
