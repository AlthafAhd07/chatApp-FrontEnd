import { io } from "socket.io-client";
// chatapp-backend-althaf.herokuapp.com/
const URL = "ws://localhost:3001";
const socket = io(URL, {
  reconnectionDelayMax: 10000,
});

export default socket;
