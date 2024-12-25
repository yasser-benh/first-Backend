import {
  NewSession,
  SortSessionsBy,
  UpdateSession,
  SessionModel,
} from "../model/session.model";

export async function getAllSessions({
  page,
  limit,
  sort,
  sort_by,
}: {
  page: number;
  limit: number;
  sort?: "asc" | "desc";
  sort_by?: SortSessionsBy;
}) {
  const query = SessionModel.find()
    .skip((page - 1) * limit)
    .limit(limit);

  if (sort_by && sort) {
    query.sort({ [sort_by]: sort });
  }
  const data = await query.exec();
  return data;
}

export async function getSessionById(id: string) {
  return await SessionModel.findById(id);
}

export async function createSession(Session: NewSession) {
  return await SessionModel.create(Session);
}

export async function updateSession(id: string, Session: UpdateSession) {
  return await SessionModel.findByIdAndUpdate(id, Session);
}

export async function deleteSession(id: string) {
  return await SessionModel.findByIdAndDelete(id);
}
