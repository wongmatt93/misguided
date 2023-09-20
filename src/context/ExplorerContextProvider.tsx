import { ReactNode, useState } from "react";
import { UserProfile } from "../models/UserProfile";
import { getUserProfileByUid } from "../services/userProfileServices";
import { getCurrentDateString } from "../utils/dateFunctions";
import ExplorerContext from "./ExplorerContext";

interface Props {
  children: ReactNode;
}

const ExplorerContextProvider = ({ children }: Props) => {
  // hooks
  const [explorer, setExplorer] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshExplorerProfile = async (uid: string): Promise<void> =>
    setExplorer(await getUserProfileByUid(uid, getCurrentDateString));

  return (
    <ExplorerContext.Provider
      value={{ explorer, loading, setLoading, refreshExplorerProfile }}
    >
      {children}
    </ExplorerContext.Provider>
  );
};

export default ExplorerContextProvider;
