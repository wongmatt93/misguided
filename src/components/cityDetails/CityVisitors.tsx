import { useContext, useEffect, useState } from "react";
import FollowContext from "../../context/FollowContext";
import City from "../../models/City";
import "./CityVisitors.css";
import VisitorCard from "./VisitorCard";

interface Props {
  city: City;
}

const CityVisitors = ({ city }: Props) => {
  const { following } = useContext(FollowContext);
  const [visitors, setVisitors] = useState<string[]>([]);

  useEffect(() => {
    const visited: string[] = [];

    following.forEach((user) => {
      if (city.visitors.find((visitor) => visitor.uid === user.uid)) {
        visited.push(user.uid);
      }
    });

    setVisitors(visited);
  }, [following, city]);

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
