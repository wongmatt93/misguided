import { Trip, Participant } from "../models/Trip";
import ActiveUserProfile, { UserProfile } from "../models/UserProfile";
import {
  getCityById,
  removeRating,
  removeVisitor,
} from "../services/cityService";
import {
  deleteTrip,
  removeAllUserComments,
  removeAllUserLikes,
  removeParticipantFromTrip,
  updateCreator,
} from "../services/tripServices";
import { deleteUser, removeAllUserFollowings } from "../services/userService";

const formatUserProfileToSave = (
  userProfile: ActiveUserProfile
): UserProfile => {
  const {
    uid,
    username,
    displayName,
    email,
    phoneNumber,
    photoURL,
    hometownId,
    preferences,
    favoriteCityIds,
    hiddenCityIds,
    notifications,
    visitedCityIds,
  } = userProfile;

  const followingUids: string[] = userProfile.followingUserProfiles.map(
    (profile) => profile.uid
  );

  return {
    _id: userProfile._id!,
    uid,
    username,
    displayName,
    email,
    phoneNumber,
    photoURL,
    hometownId,
    preferences,
    followingUids,
    favoriteCityIds,
    hiddenCityIds,
    notifications,
    visitedCityIds,
  };
};

const deleteAccount = async (userProfile: ActiveUserProfile): Promise<void> => {
  const { uid, upcomingTrips, pastTrips, visitedCityIds } = userProfile;

  // delete user from followers' followingsUids
  removeAllUserFollowings(uid);

  // delete user from liked trips
  removeAllUserLikes(uid);

  // delete user from commented trips
  removeAllUserComments(uid);

  // delete user from trips
  const allTrips: Trip[] = upcomingTrips.concat(pastTrips);

  allTrips.forEach((trip) => {
    const acceptedParticipants: Participant[] = trip.participants.filter(
      (participant) => participant.accepted
    );

    if (acceptedParticipants.length === 1) {
      // deletes trip if user is the only accepted participant
      deleteTrip(trip._id!);
    } else {
      removeParticipantFromTrip(trip._id!, uid);

      // reassigns creatorUid if user was creator but there are other participants
      if (trip.creatorUid === uid) {
        const newCreator: Participant | undefined = acceptedParticipants.find(
          (participant) => participant.uid !== uid
        );

        if (newCreator) {
          updateCreator(trip._id!, newCreator.uid);
        }
      }
    }
  });

  // delete user from visited cities
  visitedCityIds.forEach(async (cityId) => {
    removeVisitor(cityId, uid);
    const city = await getCityById(cityId);
    city.ratings.some((rating) => rating.uid === uid) &&
      removeRating(cityId, uid);
  });

  // delete user from users documents
  deleteUser(uid);
};

export { formatUserProfileToSave, deleteAccount };
