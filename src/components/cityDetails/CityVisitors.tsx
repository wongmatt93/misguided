import { useEffect, useState } from "react";
import City from "../../models/City";
import "./CityVisitors.css";
import VisitorCard from "./VisitorCard";

interface Props {
  city: City;
  followingUids: string[];
}

const CityVisitors = ({ city, followingUids }: Props) => {
  const [visitors, setVisitors] = useState<string[]>([]);

  useEffect(() => {
    setVisitors(
      followingUids.filter((uid) =>
        city.visitorsUids.find((visitor) => visitor === uid)
      )
    );
  }, [followingUids, city]);

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
