import { io } from "socket.io-client";

const URL = "ws://chatapp-backend-althaf.herokuapp.com/";
const socket = io(URL, {
  reconnectionDelayMax: 10000,
});

export default socket;
