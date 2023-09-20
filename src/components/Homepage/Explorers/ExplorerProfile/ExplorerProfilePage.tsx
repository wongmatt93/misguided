import { useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ExplorerContext from "../../../../context/ExplorerContext";
import { Trip } from "../../../../models/Trip";
import { sortTripsDescending } from "../../../../utils/dateFunctions";
import ExplorerProfileInfo from "./ExplorerProfileInfo";
import "./ExplorerProfilePage.css";
import ExplorerProfileTrips from "./ExplorerProfileTrips";

interface Props {
  uid: string;
  refreshProfile: () => Promise<void>;
}

const ExplorerProfilePage = ({ uid, refreshProfile }: Props) => {
  // variables
  const { explorer, loading, setLoading, refreshExplorerProfile } =
    useContext(ExplorerContext);
  const profileUid: string | undefined = useParams().uid;
  let completedTrips: Trip[] =
    explorer?.pastTrips.filter((trip) => trip.completed) || [];

  // functions
  useEffect(() => {
    setLoading(true);
    profileUid &&
      refreshExplorerProfile(profileUid).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileUid]);

  return (
    <div className="ExplorerProfilePage">
      {!loading ? (
        profileUid &&
        explorer && (
          <>
            <ExplorerProfileInfo
              uid={uid}
              explorer={explorer}
              completedTripsCount={completedTrips.length}
              refreshProfile={refreshProfile}
              refreshExplorerProfile={() => refreshExplorerProfile(profileUid)}
            />
            <ExplorerProfileTrips
              uid={uid}
              completedTrips={sortTripsDescending(completedTrips)}
            />
          </>
        )
      ) : (
        <div className="generating-block">
          <Spinner />
          <p>Loading Profile...</p>
        </div>
      )}
    </div>
  );
};

export default ExplorerProfilePage;
