import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Preferences } from "../../models/UserProfile";
import "./PreferencesCheckboxes.css";

interface Props {
  preferences: Preferences | null;
  setPreferences: React.Dispatch<React.SetStateAction<Preferences | null>>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const PreferencesCheckboxes = ({
  preferences,
  setPreferences,
  setStage,
}: Props) => {
  const [charming, setCharming] = useState(false);
  const [foodie, setFoodie] = useState(false);
  const [nightlife, setNightlife] = useState(false);
  const [architecture, setArchitecture] = useState(false);
  const [history, setHistory] = useState(false);
  const [museums, setMuseums] = useState(false);
  const [performingArts, setPerformingArts] = useState(false);
  const [music, setMusic] = useState(false);
  const [hipster, setHipster] = useState(false);
  const [hippie, setHippie] = useState(false);
  const [posh, setPosh] = useState(false);
  const [familyFriendly, setFamilyFriendly] = useState(false);
  const [lGBTScene, setLgbtScene] = useState(false);
  const [diversity, setDiversity] = useState(false);
  const [beachTown, setBeachTown] = useState(false);
  const [collegeTown, setCollegeTown] = useState(false);
  const [skiTown, setSkiTown] = useState(false);
  const [outdoorsy, setOutdoorsy] = useState(false);
  const [wineries, setWineries] = useState(false);
  const [shopping, setShopping] = useState(false);
  const [selectedSome, setSelectedsome] = useState(false);

  useEffect(() => {
    if (preferences) {
      setCharming(preferences.charming);
      setFoodie(preferences.foodie);
      setNightlife(preferences.nightlife);
      setArchitecture(preferences.architecture);
      setHistory(preferences.history);
      setMuseums(preferences.museums);
      setPerformingArts(preferences.performingArts);
      setMusic(preferences.music);
      setHipster(preferences.hipster);
      setHippie(preferences.hippie);
      setPosh(preferences.posh);
      setFamilyFriendly(preferences.familyFriendly);
      setLgbtScene(preferences.lGBTScene);
      setDiversity(preferences.diversity);
      setBeachTown(preferences.beachTown);
      setCollegeTown(preferences.collegeTown);
      setSkiTown(preferences.skiTown);
      setOutdoorsy(preferences.outdoorsy);
      setWineries(preferences.wineries);
      setShopping(preferences.shopping);
    }
  }, [preferences]);

  useEffect(() => {
    const prefArray: boolean[] = [
      charming,
      foodie,
      nightlife,
      architecture,
      history,
      museums,
      performingArts,
      music,
      hipster,
      hippie,
      posh,
      familyFriendly,
      lGBTScene,
      diversity,
      beachTown,
      collegeTown,
      skiTown,
      outdoorsy,
      wineries,
      shopping,
    ];

    setSelectedsome(prefArray.some((pref) => pref));
  }, [
    charming,
    foodie,
    nightlife,
    architecture,
    history,
    museums,
    performingArts,
    music,
    hipster,
    hippie,
    posh,
    familyFriendly,
    lGBTScene,
    diversity,
    beachTown,
    collegeTown,
    skiTown,
    outdoorsy,
    wineries,
    shopping,
  ]);

  const createPreferenceObject = (): void => {
    const newPreferences: Preferences = {
      charming,
      foodie,
      nightlife,
      architecture,
      history,
      museums,
      performingArts,
      music,
      hipster,
      hippie,
      posh,
      familyFriendly,
      lGBTScene,
      diversity,
      beachTown,
      collegeTown,
      skiTown,
      outdoorsy,
      wineries,
      shopping,
    };

    setPreferences(newPreferences);
    setStage("createAccount");
  };

  return (
    <div className="PreferencesCheckboxes animate__animated animate__fadeIn">
      <p>Choose your preferences</p>
      <div className="checkboxes">
        <Form.Check
          name="charming"
          id="charming"
          checked={charming}
          onChange={(e) => setCharming(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-heart" />
              <div>Charming</div>
            </div>
          }
        />

        <Form.Check
          name="foodie"
          id="foodie"
          checked={foodie}
          onChange={(e) => setFoodie(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-bowl-food" />
              <div>Foodie</div>
            </div>
          }
        />

        <Form.Check
          name="nightlife"
          id="nightlife"
          checked={nightlife}
          onChange={(e) => setNightlife(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-martini-glass-citrus" />
              <div>Nightlife</div>
            </div>
          }
        />

        <Form.Check
          name="architecture"
          id="architecture"
          checked={architecture}
          onChange={(e) => setArchitecture(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-torii-gate" />
              <div>Architecture</div>
            </div>
          }
        />

        <Form.Check
          name="history"
          id="history"
          checked={history}
          onChange={(e) => setHistory(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-chess-rook" />
              <div>History</div>
            </div>
          }
        />

        <Form.Check
          name="museums"
          id="museums"
          checked={museums}
          onChange={(e) => setMuseums(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-building-columns" />
              <div>Museums</div>
            </div>
          }
        />

        <Form.Check
          name="performingArts"
          id="performingArts"
          checked={performingArts}
          onChange={(e) => setPerformingArts(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-masks-theater" />
              <div>Performing Arts</div>
            </div>
          }
        />

        <Form.Check
          name="music"
          id="music"
          checked={music}
          onChange={(e) => setMusic(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-music" />
              <div>Music</div>
            </div>
          }
        />

        <Form.Check
          name="hipster"
          id="hipster"
          checked={hipster}
          onChange={(e) => setHipster(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-glasses" />
              <div>Hipster</div>
            </div>
          }
        />

        <Form.Check
          name="hippie"
          id="hippie"
          checked={hippie}
          onChange={(e) => setHippie(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-peace" />
              <div>Hippie</div>
            </div>
          }
        />

        <Form.Check
          name="posh"
          id="posh"
          checked={posh}
          onChange={(e) => setPosh(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-gem" />
              <div>Posh</div>
            </div>
          }
        />

        <Form.Check
          name="familyFriendly"
          id="familyFriendly"
          checked={familyFriendly}
          onChange={(e) => setFamilyFriendly(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-baby" />
              <div>Family Friendly</div>
            </div>
          }
        />

        <Form.Check
          name="lgbtScene"
          id="lgbtScene"
          checked={lGBTScene}
          onChange={(e) => setLgbtScene(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-rainbow" />
              <div>LGBT Scene</div>
            </div>
          }
        />

        <Form.Check
          name="diversity"
          id="diversity"
          checked={diversity}
          onChange={(e) => setDiversity(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-people-group" />
              <div>Diversity</div>
            </div>
          }
        />

        <Form.Check
          name="beachTown"
          id="beachTown"
          checked={beachTown}
          onChange={(e) => setBeachTown(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-umbrella-beach" />
              <div>Beach Town</div>
            </div>
          }
        />

        <Form.Check
          name="collegeTown"
          id="collegeTown"
          checked={collegeTown}
          onChange={(e) => setCollegeTown(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-graduation-cap" />
              <div>College Town</div>
            </div>
          }
        />

        <Form.Check
          name="skiTown"
          id="skiTown"
          checked={skiTown}
          onChange={(e) => setSkiTown(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-person-skiing" />
              <div>Ski Town</div>
            </div>
          }
        />

        <Form.Check
          name="outdoorsy"
          id="outdoorsy"
          checked={outdoorsy}
          onChange={(e) => setOutdoorsy(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-tree" />
              <div>Outdoorsy</div>
            </div>
          }
        />

        <Form.Check
          name="wineries"
          id="wineries"
          checked={wineries}
          onChange={(e) => setWineries(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-wine-glass" />
              <div>Wineries</div>
            </div>
          }
        />

        <Form.Check
          name="shopping"
          id="shopping"
          checked={shopping}
          onChange={(e) => setShopping(e.target.checked)}
          label={
            <div>
              <i className="fa-solid fa-bag-shopping" />
              <div>Shopping</div>
            </div>
          }
        />
      </div>

      <div className="preference-button-container">
        <Button
          variant="warning"
          type="button"
          onClick={() => setStage("hometown")}
        >
          Back
        </Button>

        <Button
          variant="warning"
          type="button"
          disabled={selectedSome ? false : true}
          onClick={createPreferenceObject}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PreferencesCheckboxes;
