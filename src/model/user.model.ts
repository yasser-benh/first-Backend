import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface User {
  _id: mongoose.Schema.Types.ObjectId;
  avatar: string;
  name: string;
  role: string;
  email: string;
  password: string;
}

interface UserDocument extends User, mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type NewUser = {
  avatar: string;
  role: string;
  name: string;
  email: string;
  password: string;
};

export type UpdateUser = Partial<NewUser>;

export type SortUsersBy = keyof User;

export const UserModelName = "User";

const UserSchema = new mongoose.Schema<User>({
  avatar: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user: UserDocument = this;
  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

export const UserModel = mongoose.model<UserDocument>(
  UserModelName,
  UserSchema
);
