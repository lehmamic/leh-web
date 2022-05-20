import { connectToMongoDb } from '@utils/mongodb';
import { User, USERS_COLLECTION } from '@models/user';
import { ObjectId } from 'mongodb';

export const getUsersById = async (userIds: string[]): Promise<User[]> => {
  const { db } = await connectToMongoDb();
  const users = await db.collection<User>(USERS_COLLECTION)
    .find({ _id: new ObjectId(userIds[0]) })
    .toArray();

  return users
}

export const getUsers = async (): Promise<User[]> => {
  const { db } = await connectToMongoDb();
  const users = await db.collection<User>(USERS_COLLECTION)
    .find()
    .toArray();

  return users
}
