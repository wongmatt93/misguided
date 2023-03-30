import { RiEmotionSadLine } from "react-icons/ri";
import "./GoodbyePage.css";

const GoodbyePage = () => {
  return (
    <section className="GoodbyePage">
      <div className="empty">
        <RiEmotionSadLine className="animate__animated animate__bounceInDown" />
        <p>It's sad to see you go. We hope you adventure with us again soon.</p>
      </div>
    </section>
  );
};

export default GoodbyePage;
