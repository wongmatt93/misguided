import { createContext } from "react";
import { UserProfile } from "../models/UserProfile";

interface ExplorerContextModel {
  explorer: UserProfile | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  refreshExplorerProfile: (uid: string) => Promise<void>;
}

const defaultValues: ExplorerContextModel = {
  explorer: null,
  loading: false,
  setLoading: () => {},
  refreshExplorerProfile: async () => {},
};

const ExplorerContext = createContext(defaultValues);

export default ExplorerContext;
