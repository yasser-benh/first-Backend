import fs from "fs";

const DATABASE_PATH = "./database/db.json";

export async function readDatabase<T>(
  entity_name: "tasks" | "projects"
): Promise<T[]> {
  const data = await fs.promises.readFile(DATABASE_PATH, "utf-8");
  return JSON.parse(data)[entity_name];
}

export async function writeDatabase<T>(
  data: T[],
  entity_name: "tasks" | "projects"
): Promise<void> {
  const db_data = await fs.promises.readFile(DATABASE_PATH, "utf-8");
  const db = JSON.parse(db_data);
  const new_db_data = { ...db, [entity_name]: data };
  await fs.promises.writeFile(DATABASE_PATH, JSON.stringify(new_db_data));
}
