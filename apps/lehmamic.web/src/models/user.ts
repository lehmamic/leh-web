export const USERS_COLLECTION = "users";

export interface User {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
}
