import mongoose from "mongoose";
import { UserModelName } from "./user.model";

export interface Session {
  _id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
  valid: boolean;
  user_agent: string;
  created_at: Date;
  updated_at: Date;
}

export type NewSession = {
  user_id: mongoose.Schema.Types.ObjectId;
  valid: boolean;
  user_agent: string;
};

export type SignupSession = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UpdateSession = {
  valid: boolean;
};

export type SortSessionsBy = keyof Session;

const SessionSchema = new mongoose.Schema<Session>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: UserModelName,
    },
    valid: { type: Boolean, required: true },
    user_agent: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export const SessionModelName = "Session";

export const SessionModel = mongoose.model<Session>(
  SessionModelName,
  SessionSchema
);
