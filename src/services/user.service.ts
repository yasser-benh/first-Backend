import {
  NewUser,
  SortUsersBy,
  UpdateUser,
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

export async function getUserById(id: number) {
  return await UserModel.findById(id);
}

export async function createUser(user: NewUser) {
  return await UserModel.create(user);
}

export async function updateUser(id: number, user: UpdateUser) {
  return await UserModel.findByIdAndUpdate(id, user);
}

export async function deleteUser(id: number) {
  return await UserModel.findByIdAndDelete(id);
}
