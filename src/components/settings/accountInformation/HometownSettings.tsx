import { FormEvent, useEffect, useState } from "react";
import { RiEditFill, RiCheckFill, RiCloseCircleFill } from "react-icons/ri";
import useCityFetcher from "../../../hooks/useCityFetcher";
import useFetchAllCities from "../../../hooks/useFetchAllCities";
import City from "../../../models/City";
import UserProfile from "../../../models/UserProfile";
import { updateUserHometown } from "../../../services/userService";
import "./HometownSettings.css";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const HometownSettings = ({ userProfile, refreshProfile }: Props) => {
  const hometown: City | null = useCityFetcher(userProfile.hometownId!);
  const cities: City[] = useFetchAllCities();
  const [locked, setLocked] = useState(true);
  const [hometownId, setHometownId] = useState<string | null>(null);

  useEffect(() => {
    hometown && setHometownId(hometown._id!);
  }, [hometown]);

  const handleSubmit = async (
    e: FormEvent,
    newHometownId: string
  ): Promise<void> => {
    e.preventDefault();
    await updateUserHometown(userProfile.uid, newHometownId);
    await refreshProfile();
    setLocked(true);
  };

  return (
    <div className="HometownSettings">
      {hometown &&
        hometownId &&
        (locked ? (
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
          <form
            className="unlocked-settings"
            onSubmit={(e) => handleSubmit(e, hometownId!)}
          >
            <div className="name-container">
              <div className="label">hometown</div>
              <select
                value={hometownId}
                onChange={(e) => setHometownId(e.target.value)}
              >
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
                disabled={hometownId === hometown._id!}
              >
                <RiCheckFill />
              </button>
              <button type="button" onClick={() => setLocked(true)}>
                <RiCloseCircleFill />
              </button>
            </div>
          </form>
        ))}
    </div>
  );
};

export default HometownSettings;
