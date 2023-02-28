import City from "../../models/City";
import UserProfile from "../../models/UserProfile";
import "./CityCharacteristics.css";

interface Props {
  city: City;
  userProfile: UserProfile;
}

const CityCharacteristics = ({ city, userProfile }: Props) => {
  return (
    <ul className="CityCharacteristics">
      {city.knownFor.map((item, index) => {
        const known: string = item
          .replace(
            /(?:^\w|[A-Z]|\b\w)/g,
            function (word: string, index: number) {
              return index === 0 ? word.toLowerCase() : word.toUpperCase();
            }
          )
          .replace(/\s+/g, "");
        return (
          <li
            key={index}
            style={
              userProfile &&
              userProfile.preferences![
                known as keyof typeof userProfile.preferences
              ]
                ? { backgroundColor: "#f0b202" }
                : { backgroundColor: "#ededed" }
            }
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default CityCharacteristics;
