import { UserSummary } from "../../../../../models/UserProfile";
import "./CityVisitors.css";
import VisitorCard from "./VisitorCard";

interface Props {
  followingsVisitors: UserSummary[];
}

const CityVisitors = ({ followingsVisitors }: Props) => {
  return (
    <div className="CityVisitors">
      <p className="visitors">Visitors:</p>
      <ul>
        {followingsVisitors.map((visitor) => (
          <VisitorCard key={visitor.uid} visitor={visitor} />
        ))}
      </ul>
    </div>
  );
};

export default CityVisitors;
