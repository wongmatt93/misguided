import Trip from "../models/Trip";
import UserProfile from "../models/UserProfile";
import {
  deleteTrip,
  getTripsByTripIdArray,
  removeParticipantFromTrip,
  updateCreator,
} from "../services/tripServices";
import {
  deleteUser,
  deleteUserTrip,
  getAllUsersByUidArray,
  removeFollower,
  removeFollowing,
} from "../services/userService";

const deleteAccount = async (userProfile: UserProfile): Promise<void> => {
  // delete user from followers' followersUid
  if (userProfile.followersUids.length > 0) {
    const followers: UserProfile[] = await getAllUsersByUidArray(
      userProfile.followersUids
    );
    await Promise.allSettled(
      followers.map((follower) => removeFollower(follower.uid, userProfile.uid))
    );
  }

  // delete user from followings' followingsUid
  if (userProfile.followingUids.length > 0) {
    const followings: UserProfile[] = await getAllUsersByUidArray(
      userProfile.followingUids
    );
    await Promise.allSettled(
      followings.map((following) =>
        removeFollowing(following.uid, userProfile.uid)
      )
    );
  }

  // delete user from trips
  if (userProfile.trips.length > 0) {
    const tripIds: string[] = userProfile.trips.map((trip) => trip.tripId);
    const trips: Trip[] = await getTripsByTripIdArray(tripIds);
    await Promise.allSettled(
      trips.map(async (trip) => {
        const participants: UserProfile[] = await getAllUsersByUidArray(
          trip.participantsUids
        );

        const acceptedParticipants: UserProfile[] = participants.filter(
          (participant) =>
            participant.trips.filter(
              (item) => item.accepted && item.tripId === trip._id!
            )
        );

        if (acceptedParticipants.length === 1) {
          // deletes trip if user is the only accepted participant
          if (participants.length > 1) {
            Promise.allSettled(
              trip.participantsUids.map((uid) => deleteUserTrip(uid, trip._id!))
            );
          }

          await deleteTrip(trip._id!);
        } else {
          removeParticipantFromTrip(trip._id!, userProfile.uid);

          // reassigns creatorUid if user was creator but there are other participants
          if (trip.creatorUid === userProfile.uid) {
            const newCreator: UserProfile | undefined =
              acceptedParticipants.find(
                (participant) => participant.uid !== userProfile.uid
              );

            if (newCreator) {
              updateCreator(trip._id!, newCreator.uid);
            }
          }
        }
      })
    );
  }

  // delete user from users documents
  await deleteUser(userProfile.uid);
};

export { deleteAccount };
