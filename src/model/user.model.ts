import mongoose from "mongoose";

export interface User {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
}

export type NewUser = {
  name: string;
  email: string;
};

export type UpdateUser = Partial<NewUser>;

export type SortUsersBy = keyof User;

export const UserModelName = "User";

const UserSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export const UserModel = mongoose.model<User>(UserModelName, UserSchema);
