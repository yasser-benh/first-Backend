import { readDatabase, writeDatabase } from "../helpers/db.helpers";
import { paginateData, sortData } from "../helpers/query.helpers";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type NewUser = {
  name: string;
  email: string;
};

export type UpdateUser = Partial<NewUser>;

export type SortUsersBy = "id";

export async function getAllUsersFromDb({
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
  let data = await readDatabase<User>("projects");
  if (sort_by && sort) {
    data = sortData(data, sort, sort_by);
  }
  return paginateData(data, page, limit);
}

export async function getUserByIdFromDb(id: number) {
  const data = await readDatabase<User>("projects");
  const user = data.find((user) => {
    return user.id === id;
  });
  return user;
}

export async function createUserFromDb(new_user: NewUser) {
  const users = await readDatabase<User>("projects");
  const user = { ...new_user, id: new Date().getTime() };
  await writeDatabase([...users, user], "projects");
}

export async function updateUserFromDb(id: number, updated_user: UpdateUser) {
  const users = await readDatabase<User>("projects");
  const new_users = users.map((user) => {
    if (user.id === id) {
      return { ...user, ...updated_user };
    }
    return user;
  });
  await writeDatabase(new_users, "projects");
}

export async function deleteUserFromDb(id: number): Promise<void> {
  const users = await readDatabase<User>("projects");
  const new_users = users.filter((user) => user.id !== id);
  await writeDatabase(new_users, "projects");
}
