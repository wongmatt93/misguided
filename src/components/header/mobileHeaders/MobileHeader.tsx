import { useState } from "react";
import HomeHeader from "../../home/HomeHeader";
import "./MobileHeader.css";

const MobileHeader = () => {
  const [page, setPage] = useState("home");

  return (
    <>
      {() => {
        switch (page) {
          case "home":
            return <HomeHeader />;
          default:
            return <HomeHeader />;
        }
      }}
    </>
  );
};

export default MobileHeader;
