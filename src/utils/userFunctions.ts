import Trip, { Participant } from "../models/Trip";
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
  removeFollower,
  removeFollowing,
} from "../services/userService";

const getAcceptedTrips = async (user: UserProfile): Promise<Trip[]> =>
  getTripsByTripIdArray(user.tripIds).then((response) =>
    response.filter((trip) =>
      trip.participants.some(
        (participant) => participant.uid === user.uid && participant.accepted
      )
    )
  );

const deleteAccount = async (userProfile: UserProfile): Promise<void> => {
  const { uid, followersUids, followingUids, tripIds } = userProfile;

  // delete user from followers' followersUids
  if (followersUids.length > 0) {
    await Promise.allSettled(
      followersUids.map((follower) => removeFollowing(follower, uid))
    );
  }

  // delete user from followings' followingUids
  if (followingUids.length > 0) {
    await Promise.allSettled(
      followingUids.map((following) => removeFollower(following, uid))
    );
  }

  // delete user from trips
  if (tripIds.length > 0) {
    const tripObjects: Trip[] = await getTripsByTripIdArray(tripIds);
    await Promise.allSettled(
      tripObjects.map(async (trip) => {
        const acceptedParticipants: Participant[] = trip.participants.filter(
          (participant) => participant.accepted
        );

        if (acceptedParticipants.length === 1) {
          // deletes trip if user is the only accepted participant
          if (trip.participants.length > 1) {
            Promise.allSettled(
              trip.participants.map((participant) =>
                deleteUserTrip(participant.uid, trip._id!)
              )
            );
          }

          await deleteTrip(trip._id!);
        } else {
          removeParticipantFromTrip(trip._id!, uid);

          // reassigns creatorUid if user was creator but there are other participants
          if (trip.creatorUid === uid) {
            const newCreator: Participant | undefined =
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

export { getAcceptedTrips, deleteAccount };
