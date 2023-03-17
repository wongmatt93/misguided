import "./LandingPage.css";
import { signInWithGoogle } from "../../firebaseConfig";
import "animate.css";

const LandingPage = () => {
  return (
    <section className="LandingPage">
      <div className="logo-container">
        <h2>
          Plan Your{" "}
          <span
            style={{ display: "inline-block" }}
            className="animate__animated animate__hinge animate__delay-3s animate__slower"
          >
            Dream
          </span>{" "}
          Vacation
        </h2>
      </div>

      <div className="button-p-container">
        <p>We make the plan. You pack your bags.</p>
        <div className="sign-in-button-container">
          <button className="sign-in-button" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
