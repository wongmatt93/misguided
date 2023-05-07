import { useEffect, useState } from "react";
import City from "../../models/City";
import { UserProfile } from "../../models/UserProfile";
import "./CityVisitors.css";
import VisitorCard from "./VisitorCard";

interface Props {
  city: City;
  followingUserProfiles: UserProfile[];
}

const CityVisitors = ({ city, followingUserProfiles }: Props) => {
  const [visitors, setVisitors] = useState<UserProfile[]>([]);

  useEffect(() => {
    setVisitors(
      followingUserProfiles.filter((profile) =>
        city.visitorsUids.find((visitor) => visitor === profile.uid)
      )
    );
  }, [followingUserProfiles, city]);

  return (
    <>
      {visitors.length > 0 && (
        <div className="CityVisitors">
          <p className="visitors">Visitors:</p>
          <ul>
            {visitors.map((visitor) => (
              <VisitorCard key={visitor.uid} visitor={visitor} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default CityVisitors;
