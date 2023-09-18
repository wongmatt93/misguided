import City from "../models/City";
import { Participant, Trip } from "../models/Trip";
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
} from "../services/userProfileServices";

export const deleteAccount = async (
  uid: string,
  upcomingTrips: Trip[],
  pastTrips: Trip[],
  visitedCityIds: string[],
  cities: City[]
): Promise<void> => {
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
  visitedCityIds.forEach(async (cityId) => {
    removeVisitor(cityId, uid);
    const city = cities.find((city) => city._id === cityId)!;
    city.ratings.some((rating) => rating.uid === uid) &&
      removeRating(cityId, uid);
  });

  // delete user from users documents
  deleteUser(uid);
};
