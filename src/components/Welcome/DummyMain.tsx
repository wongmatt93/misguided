import { useEffect, useState } from "react";
import { Badge, Button, Form, InputGroup } from "react-bootstrap";
import {
  RiCameraOffFill,
  RiChatDeleteFill,
  RiCloseCircleLine,
  RiFlightTakeoffFill,
  RiSearchLine,
} from "react-icons/ri";
import ActiveUserProfile, { UserProfile } from "../../models/UserProfile";
import { getUserSuggestions } from "../../services/userService";
import ExplorerFriendsSection from "../Explorers/Friends/ExplorerFriendsSection";
import ExplorerSuggestionsSection from "../Explorers/Suggestions/ExplorerSuggestionsSection";
import FavoritesContainer from "../Planning/Favorites/FavoritesContainer";
import "./DummyMain.css";

interface Props {
  stage: string;
  userProfile: ActiveUserProfile;
  refreshProfile: () => Promise<void>;
}

const DummyMain = ({ stage, userProfile, refreshProfile }: Props) => {
  const [suggestions, setSuggestions] = useState<UserProfile[]>([]);

  useEffect(() => {
    getUserSuggestions(userProfile).then((response) =>
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
          <ExplorerSuggestionsSection
            suggestions={suggestions}
            userProfile={userProfile}
            refreshProfile={refreshProfile}
          />
          <ExplorerFriendsSection friends={[]} />
        </div>
      )}

      {stage === "planning" && (
        <div>
          <FavoritesContainer userProfile={userProfile} />
          <div className="discover-text">
            <p>Don't see a city you like? Discover new cities!</p>
            <Button className="discover-button" variant="warning">
              Discover
            </Button>
          </div>
        </div>
      )}

      {stage === "trips" && (
        <div className="trips">
          <nav className="trips-nav">
            <ul>
              <li className="active">Upcoming Trips</li>
              <li>Past Trips</li>
            </ul>
          </nav>
          <div className="trips-main empty">
            <RiFlightTakeoffFill />
            <p>You don't have any upcoming trips.</p>
            <p>Click here to start planning one!</p>
          </div>
        </div>
      )}

      {stage === "inbox" && (
        <div className="inbox">
          <nav className="inbox-nav">
            <ul>
              <li className="active">
                <Badge>0</Badge>
                Messages
              </li>
              <li>
                <Badge>0</Badge>
                Notifications
              </li>
            </ul>
          </nav>
          <div className="inbox-main empty">
            <RiChatDeleteFill />
            <p>No Messages</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DummyMain;
