import {
  NewUser,
  SortUsersBy,
  UpdateUser,
  User,
  UserModel,
} from "../model/user.model";

export async function getAllUsers({
  page,
  limit,
  sort,
  sort_by,
}: {
  page: number;
  limit: number;
  sort?: "asc" | "desc";
  sort_by?: SortUsersBy;
}) {
  const query = UserModel.find()
    .skip((page - 1) * limit)
    .limit(limit);

  if (sort_by && sort) {
    query.sort({ [sort_by]: sort });
  }
  const data = await query.exec();
  return data;
}

export async function getUserById(id: string) {
  return await UserModel.findById(id);
}

export async function getUserByEmail(email: string) {
  return await UserModel.findOne({ email });
}

export async function createUser(user: NewUser) {
  return await UserModel.create(user);
}

export async function updateUser(id: string, user: UpdateUser) {
  return await UserModel.findByIdAndUpdate(id, user);
}

export async function deleteUser(id: string) {
  return await UserModel.findByIdAndDelete(id);
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{
  valid: boolean;
  user: User | null;
}> {
  const user = await getUserByEmail(email);
  if (user === null) {
    return {
      valid: false,
      user: null,
    };
  }
  const valid = await user.comparePassword(password);
  return {
    valid,
    user,
  };
}
