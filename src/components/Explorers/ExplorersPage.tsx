import { FormEvent, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { RiCloseCircleLine, RiSearchLine } from "react-icons/ri";
import ActiveUserProfile, { UserProfile } from "../../models/UserProfile";
import {
  getUserBySearch,
  getUserSuggestions,
} from "../../services/userService";
import { getFriends } from "../../utils/followFunctions";
import "./ExplorersPage.css";
import ExplorerFriendsSection from "./Friends/ExplorerFriendsSection";
import ExplorersSearchSection from "./SearchResults/ExplorersSearchSection";
import ExplorerSuggestionsSection from "./Suggestions/ExplorerSuggestionsSection";

interface Props {
  userProfile: ActiveUserProfile;
  refreshProfile: () => Promise<void>;
}

const ExplorersPage = ({ userProfile, refreshProfile }: Props) => {
  const friends: UserProfile[] = getFriends(userProfile);
  const [suggestions, setSuggestions] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    getUserSuggestions(userProfile).then((response) =>
      setSuggestions(response)
    );
  }, [userProfile]);

  const clearSearch = (): void => {
    setSearchTerm("");
    setSearched(false);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setSearchResults(await getUserBySearch(userProfile.username!, searchTerm));
    setSearched(true);
  };

  return (
    <section className="ExplorersPage">
      <Form onSubmit={handleSubmit}>
        <InputGroup className="search-input">
          <Form.Control
            placeholder="Search Users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="warning"
            type="button"
            disabled={searched ? false : true}
            onClick={clearSearch}
          >
            <RiCloseCircleLine />
          </Button>
          <Button
            variant="warning"
            type="submit"
            disabled={searchTerm ? false : true}
          >
            <RiSearchLine />
          </Button>
        </InputGroup>
      </Form>
      {searched ? (
        <ExplorersSearchSection
          userProfile={userProfile}
          refreshProfile={refreshProfile}
          searchResults={searchResults}
        />
      ) : (
        <>
          {suggestions.length > 0 && (
            <ExplorerSuggestionsSection
              suggestions={suggestions}
              userProfile={userProfile}
              refreshProfile={refreshProfile}
            />
          )}
          <ExplorerFriendsSection friends={friends} />
        </>
      )}
    </section>
  );
};

export default ExplorersPage;
