import { FormEvent, useState } from "react";
import { RiCheckFill, RiCloseCircleFill, RiEditFill } from "react-icons/ri";
import City from "../../../../../models/City";
import { updateHometown } from "../../../../../services/userProfileServices";
import "./HometownSettings.css";

interface Props {
  uid: string;
  hometownId: string;
  refreshProfile: () => Promise<void>;
  cities: City[];
}

const HometownSettings = ({
  uid,
  hometownId,
  refreshProfile,
  cities,
}: Props) => {
  // variables
  const hometown: City = cities.find((city) => city._id === hometownId)!;
  const [locked, setLocked] = useState(true);
  const [cityId, setCityId] = useState<string>(hometown._id!);

  // functions
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await updateHometown(uid, cityId);
    await refreshProfile();
    setLocked(true);
  };

  return (
    <div className="HometownSettings">
      {locked ? (
        <div className="locked-settings">
          <div className="name-container">
            <div className="label">hometown</div>
            <div className="city-name">{hometown.cityName}</div>
          </div>
          <button type="button">
            <RiEditFill onClick={() => setLocked(false)} />
          </button>
        </div>
      ) : (
        <form className="unlocked-settings" onSubmit={(e) => handleSubmit(e)}>
          <div className="name-container">
            <div className="label">hometown</div>
            <select value={cityId} onChange={(e) => setCityId(e.target.value)}>
              {cities.sort().map((city) => (
                <option key={city.cityCode} value={city._id!}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </div>
          <div className="button-container">
            <button
              className="check-button"
              type="submit"
              disabled={cityId === hometown._id!}
            >
              <RiCheckFill />
            </button>
            <button type="button" onClick={() => setLocked(true)}>
              <RiCloseCircleFill />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HometownSettings;
