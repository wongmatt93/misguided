import { useEffect, useState } from "react";
import "./SettingsHeader.css";

interface Props {
  path: string;
}

const SettingsHeader = ({ path }: Props) => {
  const [page, setPage] = useState("");

  useEffect(() => {
    if (path.includes("account")) {
      setPage("account");
    } else if (path.includes("preferences")) {
      setPage("preferences");
    } else if (path.includes("notifications")) {
      setPage("notifications");
    } else {
      setPage("");
    }
  });

  return (
    <header className="SettingsHeader">
      <h1>settings{page && ` / ${page}`}</h1>
    </header>
  );
};

export default SettingsHeader;
