import Trip, { Comment } from "../models/Trip";
import UserProfile from "../models/UserProfile";
import {
  addCommentToTrip,
  addLikesUid,
  removeCommentFromTrip,
  removeLikesUid,
} from "../services/tripServices";
import {
  addCommentedTrip,
  addLikedTrip,
  removeCommentedTrip,
  removeLikedTrip,
} from "../services/userService";

const likeTrip = async (tripId: string, uid: string): Promise<void> => {
  await addLikesUid(tripId, uid);
  addLikedTrip(uid, tripId);
};

const unlikeTrip = async (tripId: string, uid: string): Promise<void> => {
  await removeLikesUid(tripId, uid);
  removeLikedTrip(uid, tripId);
};

const commentOnTrip = async (
  tripId: string,
  comment: Comment,
  userProfile: UserProfile
): Promise<void> => {
  await addCommentToTrip(tripId, comment);
  if (!userProfile.commentedTripIds.some((item) => item === tripId)) {
    addCommentedTrip(userProfile.uid, tripId);
  }
};

const deleteCommentFromTrip = async (
  trip: Trip,
  comment: Comment
): Promise<void> => {
  await removeCommentFromTrip(trip._id!, comment);
  if (trip.comments.filter((item) => item.uid === comment.uid).length === 1) {
    removeCommentedTrip(comment.uid, trip._id!);
  }
};

export { likeTrip, unlikeTrip, commentOnTrip, deleteCommentFromTrip };
