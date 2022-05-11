export const USERS_COLLECTION = "users";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}
