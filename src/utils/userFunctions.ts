import Trip, { Comment, Participant } from "../models/Trip";
import UserProfile from "../models/UserProfile";
import {
  deleteTrip,
  getTripsByTripIdArray,
  removeCommentFromTrip,
  removeLikesUid,
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
  const {
    uid,
    followersUids,
    followingUids,
    tripIds,
    likedTripIds,
    commentedTripIds,
  } = userProfile;

  // delete user from followers' followersUids
  if (followersUids.length) {
    followersUids.forEach((follower) => removeFollowing(follower, uid));
  }

  // delete user from followings' followingUids
  if (followingUids.length) {
    followingUids.forEach((following) => removeFollower(following, uid));
  }

  // delete user likes
  if (likedTripIds.length) {
    likedTripIds.forEach((tripId) => removeLikesUid(tripId, uid));
  }

  // delete user comments
  if (commentedTripIds.length) {
    const tripObjects: Trip[] = await getTripsByTripIdArray(commentedTripIds);

    tripObjects.forEach((trip) => {
      const userComments: Comment[] = trip.comments.filter(
        (comment) => comment.uid === uid
      );

      userComments.forEach((userComment) =>
        removeCommentFromTrip(trip._id!, userComment)
      );
    });
  }

  // delete user from trips
  if (tripIds.length) {
    const tripObjects: Trip[] = await getTripsByTripIdArray(tripIds);

    tripObjects.forEach((trip) => {
      const acceptedParticipants: Participant[] = trip.participants.filter(
        (participant) => participant.accepted
      );

      if (acceptedParticipants.length === 1) {
        // deletes trip if user is the only accepted participant
        if (trip.participants.length > 1) {
          trip.participants.forEach((participant) =>
            deleteUserTrip(participant.uid, trip._id!)
          );
        }

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
  }

  // delete user from users documents
  deleteUser(uid);
};

export { getAcceptedTrips, deleteAccount };
