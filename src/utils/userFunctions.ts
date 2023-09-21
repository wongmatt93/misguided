import City from "../models/City";
import { Participant, Trip } from "../models/Trip";
import { CitySummary, Notification } from "../models/UserProfile";
import { removeRating, removeVisitor } from "../services/cityServices";
import {
  deleteTrip,
  removeAllUserComments,
  removeAllUserLikes,
  removeParticipantFromTrip,
  updateCreator,
} from "../services/tripServices";
import {
  deleteUser,
  removeAllUserFollowings,
  removeAllUserNotifications,
} from "../services/userProfileServices";

export const getUnreadNotifsCount = (notifications: Notification[]): number =>
  notifications.filter((notif) => !notif.read).length;

export const deleteAccount = async (
  uid: string,
  upcomingTrips: Trip[],
  pastTrips: Trip[],
  visitedCities: CitySummary[],
  cities: City[]
): Promise<void> => {
  // delete user from followers' followingsUids
  removeAllUserFollowings(uid);

  // delete user from liked trips
  removeAllUserLikes(uid);

  // delete user from commented trips
  removeAllUserComments(uid);

  // delete user's notificaitons from other profiles
  removeAllUserNotifications(uid);

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
      if (trip.creator.uid === uid) {
        const newCreator: Participant | undefined = acceptedParticipants.find(
          (participant) => participant.user.uid !== uid
        );

        if (newCreator) {
          updateCreator(trip._id!, newCreator.user.uid);
        }
      }
    }
  });

  // delete user from visited cities
  visitedCities.forEach(async (visitedCity) => {
    removeVisitor(visitedCity._id, uid);
    const city: City = cities.find((city) => city._id === visitedCity._id)!;
    city.ratings.some((rating) => rating.uid === uid) &&
      removeRating(visitedCity._id, uid);
  });

  // delete user from users documents
  deleteUser(uid);
};
