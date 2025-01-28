import {
  MessageModel,
  NewMessage,
  SortMessagesBy,
  UpdateMessage,
} from "../model/messages.model";

export async function getMessages({
  page,
  limit,
  sort,
  sort_by,
}: {
  page: number;
  limit: number;
  sort?: "asc" | "desc";
  sort_by?: SortMessagesBy;
}) {
  const query = MessageModel.find()
    .skip((page - 1) * limit)
    .limit(limit);

  if (sort_by && sort) {
    query.sort({ [sort_by]: sort });
  }

  const data = await query.exec();
  return data;
}

export async function getMessageById(id: string) {
  return await MessageModel.findById(id);
}

export async function createMessage(msg: NewMessage) {
  try {
    return await MessageModel.create(msg);
  } catch (error) {
    return null;
  }
}

export async function updateMessage(id: string, msg: UpdateMessage) {
  return await MessageModel.findByIdAndUpdate(id, msg);
}

export async function deleteMessage(id: string) {
  return await MessageModel.findByIdAndDelete(id);
}
