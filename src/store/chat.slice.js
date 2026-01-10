import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChatId: 1,
  typing: false,
  chats: [
    {
      id: 1,
      name: "Sarah Jenkins",
      isGroup: false,
      messages: [
        { id: 1, text: "Hello!", mine: false, read: true },
        { id: 2, text: "Hi Sarah 👋", mine: true, read: true },
      ],
    },
    {
      id: 2,
      name: "Design Team",
      isGroup: true,
      admin: true,
      messages: [
        { id: 1, text: "Assets uploaded", mine: false, read: false },
      ],
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat(state, action) {
      state.activeChatId = action.payload;
      state.typing = false;
      const chat = state.chats.find(c => c.id === action.payload);
      chat.messages.forEach(m => (m.read = true));
    },
    sendMessage(state, action) {
      const chat = state.chats.find(c => c.id === state.activeChatId);
      chat.messages.push({
        id: Date.now(),
        text: action.payload,
        mine: true,
        read: false,
      });
    },
    setTyping(state, action) {
      state.typing = action.payload;
    },
  },
});

export const { setActiveChat, sendMessage, setTyping } = chatSlice.actions;
export default chatSlice.reducer;
