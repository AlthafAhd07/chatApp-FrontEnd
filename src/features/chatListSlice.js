import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  chatList: "",
  currentChat: "",
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {},
});

export default chatSlice.reducer;
