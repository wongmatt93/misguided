import { useEffect, useState } from "react";
import City from "../../models/City";
import UserProfile from "../../models/UserProfile";
import "./CityVisitors.css";
import VisitorCard from "./VisitorCard";

interface Props {
  city: City;
  userProfile: UserProfile;
}

const CityVisitors = ({ city, userProfile }: Props) => {
  const [visitors, setVisitors] = useState<string[]>([]);

  useEffect(() => {
    setVisitors(
      userProfile.followingUids.filter((uid) =>
        city.visitorsUids.find((visitor) => visitor === uid)
      )
    );
  }, [userProfile, city]);

  return (
    <>
      {visitors.length > 0 && (
        <div className="CityVisitors">
          <p className="visitors">Visitors:</p>
          <ul>
            {visitors.map((visitor) => (
              <VisitorCard key={visitor} uid={visitor} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default CityVisitors;
