import { useContext } from "react";
import { RiMenuLine } from "react-icons/ri";
import "./ExplorerProfileHeader.css";
import ExplorerContext from "../../../../context/ExplorerContext";

interface Props {
  uid: string;
}

const ExplorerProfileHeader = ({ uid }: Props) => {
  // variables
  const { explorer, loading } = useContext(ExplorerContext);

  return (
    <>
      {explorer && !loading && (
        <div className="ExplorerProfileHeader">
          <h1>{explorer.username}</h1>
          {uid !== explorer.uid && (
            <button className="menu-button">
              <RiMenuLine />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ExplorerProfileHeader;
