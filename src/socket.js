import { io } from "socket.io-client";

const URL = "ws://chat-app-backend-althaf.herokuapp.com/";

const socket = io("ws://localhost:3001/", {
  reconnectionDelayMax: 10000,
});

export default socket;
