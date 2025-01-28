import ws from "ws";
import { Message } from "../model/messages.model";
import mongoose from "mongoose";
import { createMessage } from "../services/message.service";

const WS_PORT = 8080;

const wss = new ws.Server({
  port: WS_PORT,
  path: "/",
});

interface ExtendedWebSocket extends ws {
  userId?: mongoose.Schema.Types.ObjectId;
}

const userClients = new Map<
  mongoose.Schema.Types.ObjectId,
  ExtendedWebSocket
>();

wss.on("listening", () => {
  console.log(`WebSocket server is running on ws://localhost:${WS_PORT}`);
});

wss.on("connection", (wsClient: ExtendedWebSocket, request) => {
  // to be replaced with token
  const userId = request.headers[
    "user_id"
  ] as unknown as mongoose.Schema.Types.ObjectId;
  // decode token and get userId

  if (userId) {
    wsClient.userId = userId;
    userClients.set(userId, wsClient);
    console.log(`Client connected with userId: ${userId}`);
  } else {
    wsClient.send("Unauthorized");
    wsClient.close();
  }

  wsClient.on("message", async (message) => {
    const messageObj = JSON.parse(message.toString()) as Omit<
      Message,
      "sent_by"
    >;
    console.log(`Received message from ${wsClient.userId}, ${message}`);
    await createMessage({
      ...messageObj,
      sent_by: wsClient.userId,
    });
    sendMessageToUser(messageObj.sent_to, {
      content: messageObj.content,
      sent_by: wsClient.userId,
    });
  });

  wsClient.on("close", () => {
    if (wsClient.userId) {
      userClients.delete(wsClient.userId);
      console.log(`Client with userId ${wsClient.userId} disconnected`);
    }
  });
});

function sendMessageToUser(
  userId: mongoose.Schema.Types.ObjectId,
  message: {
    content: string;
    sent_by: mongoose.Schema.Types.ObjectId;
  }
) {
  const client = userClients.get(userId);
  if (client && client.readyState === ws.OPEN) {
    client.send(JSON.stringify(message));
  } else {
    console.log(`No active client found for userId: ${userId}`);
  }
}
