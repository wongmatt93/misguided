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
  const { uid, followersUids, followingUids, trips } = userProfile;

  // delete user from followers' followersUid
  if (followersUids.length > 0) {
    const followers: UserProfile[] = await getAllUsersByUidArray(followersUids);
    await Promise.allSettled(
      followers.map((follower) => removeFollower(follower.uid, uid))
    );
  }

  // delete user from followings' followingsUid
  if (followingUids.length > 0) {
    const followings: UserProfile[] = await getAllUsersByUidArray(
      followingUids
    );
    await Promise.allSettled(
      followings.map((following) => removeFollowing(following.uid, uid))
    );
  }

  // delete user from trips
  if (trips.length > 0) {
    const tripIds: string[] = trips.map((trip) => trip.tripId);
    const tripObjects: Trip[] = await getTripsByTripIdArray(tripIds);
    await Promise.allSettled(
      tripObjects.map(async (trip) => {
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
          removeParticipantFromTrip(trip._id!, uid);

          // reassigns creatorUid if user was creator but there are other participants
          if (trip.creatorUid === uid) {
            const newCreator: UserProfile | undefined =
              acceptedParticipants.find(
                (participant) => participant.uid !== uid
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
  await deleteUser(uid);
};

export { deleteAccount };
