import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chatListSlice";
const store = configureStore({
  reducer: {
    chats: chatReducer,
  },
});
export default store;
