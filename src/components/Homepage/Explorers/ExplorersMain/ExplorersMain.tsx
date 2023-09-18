import { FormEvent, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { RiCloseCircleLine, RiSearchLine } from "react-icons/ri";

import { UserSummary } from "../../../../models/UserProfile";
import {
  getUserBySearch,
  getUserSuggestions,
} from "../../../../services/userProfileServices";
import { getFriends } from "../../../../utils/explorerFunctions";
import "./ExplorersMain.css";
import FriendsSection from "./FriendsSection";
import SearchResultsSection from "./SearchResultsSection";
import SuggestionsSection from "./SuggestionsSection";

interface Props {
  uid: string;
  username: string;
  followings: UserSummary[];
  followers: UserSummary[];
  refreshProfile: () => Promise<void>;
}

const ExplorersMain = ({
  uid,
  username,
  followings,
  followers,
  refreshProfile,
}: Props) => {
  // variables
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UserSummary[]>([]);
  const [searched, setSearched] = useState(false);
  const [suggestions, setSuggestions] = useState<UserSummary[]>([]);
  const friends: UserSummary[] = getFriends(followings, followers);

  // functions
  useEffect(() => {
    getUserSuggestions(uid, followings).then((response) =>
      setSuggestions(response)
    );
  }, [uid, followings]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setSearchResults(await getUserBySearch(username, searchTerm));
    setSearched(true);
  };

  const clearSearch = (): void => {
    setSearchTerm("");
    setSearched(false);
  };

  return (
    <div className="ExplorersMain">
      <Form onSubmit={handleSubmit}>
        <InputGroup className="search-input">
          <Form.Control
            placeholder="Search Users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            aria-label="Clear Search"
            variant="warning"
            type="button"
            disabled={searchTerm ? false : true}
            onClick={clearSearch}
          >
            <RiCloseCircleLine />
          </Button>
          <Button
            aria-label="Search"
            variant="warning"
            type="submit"
            disabled={searchTerm ? false : true}
          >
            <RiSearchLine />
          </Button>
        </InputGroup>
      </Form>
      {searched ? (
        <SearchResultsSection
          uid={uid}
          searchResults={searchResults}
          friends={friends}
          followers={followers}
          refreshProfile={refreshProfile}
        />
      ) : (
        <>
          {suggestions.length > 0 && (
            <SuggestionsSection
              uid={uid}
              suggestions={suggestions}
              followers={followers}
              refreshProfile={refreshProfile}
            />
          )}
          <FriendsSection friends={friends} />
        </>
      )}
    </div>
  );
};

export default ExplorersMain;
