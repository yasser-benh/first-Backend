import {
  createUserFromDb,
  deleteUserFromDb,
  getAllUsersFromDb,
  getUserByIdFromDb,
  NewUser,
  SortUsersBy,
  UpdateUser,
  updateUserFromDb,
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
  const data = await getAllUsersFromDb({ page, limit, sort, sort_by });
  return data;
}

export async function getUserById(id: number) {
  return await getUserByIdFromDb(id);
}

export async function createUser(user: NewUser) {
  return await createUserFromDb(user);
}

export async function updateUser(id: number, user: UpdateUser) {
  return await updateUserFromDb(id, user);
}

export async function deleteUser(id: number) {
  return await deleteUserFromDb(id);
}
