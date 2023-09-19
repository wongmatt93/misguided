import { Preferences } from "../../../../../models/UserProfile";
import "./CityCharacteristics.css";

interface Props {
  characteristics: string[];
  preferences: Preferences;
}

const CityCharacteristics = ({ characteristics, preferences }: Props) => {
  return (
    <ul className="CityCharacteristics">
      {characteristics.map((item, index) => {
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
              preferences![known as keyof typeof preferences]
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
