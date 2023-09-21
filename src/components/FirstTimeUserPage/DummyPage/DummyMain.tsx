import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Tab, Tabs } from "react-bootstrap";
import {
  RiCameraOffFill,
  RiCloseCircleLine,
  RiFlightTakeoffFill,
  RiMailCloseFill,
  RiSearchLine,
} from "react-icons/ri";
import { UserProfile, UserSummary } from "../../../models/UserProfile";
import { getUserSuggestions } from "../../../services/userProfileServices";
import FriendsSection from "../../Homepage/Explorers/ExplorersMain/FriendsSection";
import SuggestionsSection from "../../Homepage/Explorers/ExplorersMain/SuggestionsSection";
import Planning from "../../Homepage/Planning/Planning";
import "./DummyMain.css";

interface Props {
  stage: string;
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const DummyMain = ({ stage, userProfile, refreshProfile }: Props) => {
  const [suggestions, setSuggestions] = useState<UserSummary[]>([]);

  useEffect(() => {
    getUserSuggestions(userProfile.uid, []).then((response) =>
      setSuggestions(response)
    );
  }, [userProfile]);

  return (
    <div className="DummyMain">
      {(!stage || stage === "feed") && (
        <div className="empty">
          <RiCameraOffFill />
          <p>Your feed is currently empty.</p>
          <p>Search for users to follow!</p>
        </div>
      )}

      {stage === "explorers" && (
        <div className="explorers">
          <Form>
            <InputGroup className="search-input">
              <Form.Control placeholder="Search Users" />
              <Button variant="warning" type="button" disabled>
                <RiCloseCircleLine />
              </Button>
              <Button variant="warning" type="submit" disabled>
                <RiSearchLine />
              </Button>
            </InputGroup>
          </Form>
          <SuggestionsSection
            uid={userProfile.uid}
            suggestions={suggestions}
            followers={[]}
            refreshProfile={refreshProfile}
          />
          <FriendsSection friends={[]} />
        </div>
      )}

      {stage === "planning" && (
        <Planning
          hometownId={userProfile.hometownId!}
          favoriteCityIds={userProfile.favoriteCityIds}
          hiddenCityIds={userProfile.hiddenCityIds}
        />
      )}

      {stage === "trips" && (
        <div className="trips">
          <Tabs justify variant="pills">
            <Tab eventKey="upcomingTrips" title="Upcoming Trips">
              <div className="trips-main empty">
                <RiFlightTakeoffFill />
                <p>You don't have any upcoming trips.</p>
                <p>Click here to start planning one!</p>
              </div>
            </Tab>
            <Tab eventKey="pastTrips" title="Past Trips" />
          </Tabs>
        </div>
      )}

      {stage === "inbox" && (
        <div className="inbox">
          <Tabs justify variant="pills">
            <Tab eventKey="notifications" title="Notifications">
              <div className="empty">
                <RiMailCloseFill />
                <p>No Notifications</p>
              </div>
            </Tab>
            <Tab eventKey="messages" title="Messages" />
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default DummyMain;
