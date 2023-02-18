import { useEffect, useState } from "react";
import UserProfile from "../models/UserProfile";
import { getUserByUid } from "../services/userService";

const useGetUserByUid = (uid: string): UserProfile | null => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    getUserByUid(uid).then((response) => setUserProfile(response));
  });

  return userProfile;
};

export default useGetUserByUid;
