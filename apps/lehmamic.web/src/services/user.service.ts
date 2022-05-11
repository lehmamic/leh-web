import { connectToMongoDb } from '@utils/mongodb';
import { User, USERS_COLLECTION } from '@models/user';

export const getUsersById = async (userIds: string[]): Promise<User[]> => {
  const { db } = await connectToMongoDb();
  const users = await db.collection<User>(USERS_COLLECTION)
    .find({ _id: userIds[0] })
    .toArray();

  return users
}
