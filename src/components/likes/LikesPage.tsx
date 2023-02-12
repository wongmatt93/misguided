import HometownCard from "./HometownCard";
import LikesList from "./LikesList";
import "./LikesPage.css";

const LikesPage = () => {
  return (
    <main className="LikesPage">
      <h2>Liked Cities</h2>
      <HometownCard />
      <LikesList />
    </main>
  );
};

export default LikesPage;
