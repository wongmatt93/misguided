import { RiSkullFill } from "react-icons/ri";
import ActiveUserProfile, { UserProfile } from "../../../models/UserProfile";
import "./ExplorersSearchSection.css";
import SearchResultsContainer from "./SearchResultsContainer";

interface Props {
  userProfile: ActiveUserProfile;
  refreshProfile: () => Promise<void>;
  searchResults: UserProfile[];
}

const ExplorersSearchSection = ({
  userProfile,
  refreshProfile,
  searchResults,
}: Props) => {
  return (
    <section className="ExplorersSearchSection">
      <h2>search results</h2>
      {searchResults.length > 0 ? (
        <SearchResultsContainer
          userProfile={userProfile}
          refreshProfile={refreshProfile}
          searchResults={searchResults}
        />
      ) : (
        <div className="empty">
          <RiSkullFill />
          <p>No Results Found</p>
        </div>
      )}
    </section>
  );
};

export default ExplorersSearchSection;
