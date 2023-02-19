import FeedContainer from "./FeedContainer";
import HomeHeader from "./HomeHeader";
import "./Homepage.css";

const Homepage = () => {
  return (
    <main className="Homepage">
      <HomeHeader />
      <FeedContainer />
    </main>
  );
};

export default Homepage;
