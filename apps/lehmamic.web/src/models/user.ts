import { ObjectId } from "mongodb";

export const USERS_COLLECTION = "users";

export interface User {
  _id: ObjectId;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
}
