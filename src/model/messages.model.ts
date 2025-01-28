import mongoose from "mongoose";
import { UserModelName } from "./user.model";

export interface Message {
  _id: mongoose.Schema.Types.ObjectId;
  sent_by: mongoose.Schema.Types.ObjectId;
  sent_to: mongoose.Schema.Types.ObjectId;
  content: string;
  //   seen: boolean; TODO: Implement this
}

export type NewMessage = {
  content: string;
  sent_by: mongoose.Schema.Types.ObjectId;
  sent_to: mongoose.Schema.Types.ObjectId;
};

export type UpdateMessage = Partial<Message>;

export type SortMessagesBy = keyof Message;

const MessageSchema = new mongoose.Schema<Message>({
  content: { type: String, required: true },
  sent_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: UserModelName,
  },
  sent_to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: UserModelName,
  },
});

export const MessageModelName = "Message";

export const MessageModel = mongoose.model<Message>(
  MessageModelName,
  MessageSchema
);
