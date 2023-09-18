import { UserSummary } from "../../../../models/UserProfile";
import SearchResultCard from "./SearchResultCard";
import "./SearchResultsSection.css";

interface Props {
  uid: string;
  searchResults: UserSummary[];
  friends: UserSummary[];
  followers: UserSummary[];
  refreshProfile: () => Promise<void>;
}

const SearchResultsSection = ({
  uid,
  searchResults,
  friends,
  followers,
  refreshProfile,
}: Props) => {
  return (
    <section className="SearchResultsSection">
      <h2>Search Results</h2>
      <ul>
        {searchResults.map((searchResult) => (
          <SearchResultCard
            key={searchResult.uid}
            uid={uid}
            searchResult={searchResult}
            friends={friends}
            followers={followers}
            refreshProfile={refreshProfile}
          />
        ))}
      </ul>
    </section>
  );
};

export default SearchResultsSection;
