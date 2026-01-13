import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  activeChatId: 1,
  typing: false,
  replyingTo: null,
  onlineUsers: [1, 3], // User IDs who are online
  chats: [
    {
      id: 1,
      name: "Sarah Jenkins",
      isGroup: false,
      pinned: true,
      muted: false,
      lastSeen: "2024-01-10T14:30:00Z",
      members: 2,
      messages: [
        {
          id: uuid(),
          text: "Hello! How are you doing today?",
          mine: false,
          sender: "Sarah",
          read: true,
          sent: true,
          timestamp: "2024-01-10T09:15:00Z",
          edited: false,
          starred: false,
        },
        {
          id: uuid(),
          text: "Hi Sarah! I'm doing great, thanks for asking. Just working on some new features for our chat app.",
          mine: true,
          sender: "You",
          read: true,
          sent: true,
          timestamp: "2024-01-10T09:16:30Z",
          edited: false,
          starred: true,
        },
        {
          id: uuid(),
          text: "That sounds exciting! Can't wait to see what you've built. When do you think it will be ready?",
          mine: false,
          sender: "Sarah",
          read: true,
          sent: true,
          timestamp: "2024-01-10T09:17:45Z",
          edited: true,
          starred: false,
        },
        {
          id: uuid(),
          text: "Hopefully by the end of this week. I'll send you a preview build.",
          mine: true,
          sender: "You",
          read: false,
          sent: true,
          timestamp: "2024-01-10T09:18:20Z",
          edited: false,
          starred: false,
        },
      ],
    },
    {
      id: 2,
      name: "Design Team",
      isGroup: true,
      pinned: false,
      muted: true,
      lastSeen: "2024-01-10T13:45:00Z",
      members: 8,
      messages: [
        {
          id: uuid(),
          text: "Just uploaded the final design assets to Figma",
          mine: false,
          sender: "Alex",
          read: false,
          sent: true,
          timestamp: "2024-01-10T10:30:00Z",
          edited: false,
          starred: false,
        },
        {
          id: uuid(),
          text: "Great! I'll review them this afternoon",
          mine: true,
          sender: "You",
          read: false,
          sent: false,
          timestamp: "2024-01-10T10:32:00Z",
          edited: false,
          starred: false,
        },
        {
          id: uuid(),
          text: "Don't forget about the 3 PM meeting today",
          mine: false,
          sender: "Maria",
          read: false,
          sent: true,
          timestamp: "2024-01-10T11:45:00Z",
          edited: false,
          starred: false,
        },
      ],
    },
    {
      id: 3,
      name: "John Doe",
      isGroup: false,
      pinned: false,
      muted: false,
      lastSeen: "2024-01-10T15:20:00Z",
      members: 2,
      messages: [
        {
          id: uuid(),
          text: "Are we still on for lunch tomorrow?",
          mine: false,
          sender: "John",
          read: true,
          sent: true,
          timestamp: "2024-01-10T12:15:00Z",
          edited: false,
          starred: false,
        },
      ],
    },
    {
      id: 4,
      name: "Marketing Team",
      isGroup: true,
      pinned: true,
      muted: false,
      lastSeen: "2024-01-10T16:00:00Z",
      members: 12,
      messages: [
        {
          id: uuid(),
          text: "Q4 campaign results are in! We exceeded targets by 15%",
          mine: false,
          sender: "Lisa",
          read: true,
          sent: true,
          timestamp: "2024-01-10T14:00:00Z",
          edited: false,
          starred: true,
        },
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
      state.replyingTo = null;
      
      // Mark all messages as read in the active chat
      const chat = state.chats.find(c => c.id === action.payload);
      if (chat) {
        chat.messages.forEach(m => {
          m.read = true;
        });
      }
    },

    sendMessage(state, action) {
      const chat = state.chats.find(c => c.id === state.activeChatId);
      if (!chat) return;

      const newMessage = {
        id: uuid(),
        text: action.payload.text,
        mine: true,
        sender: "You",
        read: false,
        sent: true,
        timestamp: new Date().toISOString(),
        edited: false,
        starred: false,
        replyTo: action.payload.replyTo,
      };

      chat.messages.push(newMessage);
      state.typing = false;
    },

    setTyping(state, action) {
      state.typing = action.payload;
    },

    replyToMessage(state, action) {
      state.replyingTo = action.payload;
    },

    markAsRead(state, action) {
      const chat = state.chats.find(c => c.id === action.payload);
      if (chat) {
        chat.messages.forEach(m => {
          if (!m.mine) m.read = true;
        });
      }
    },

    toggleStarMessage(state, action) {
      const { chatId, messageId } = action.payload;
      const chat = state.chats.find(c => c.id === chatId);
      if (chat) {
        const message = chat.messages.find(m => m.id === messageId);
        if (message) {
          message.starred = !message.starred;
        }
      }
    },

    editMessage(state, action) {
      const { chatId, messageId, newText } = action.payload;
      const chat = state.chats.find(c => c.id === chatId);
      if (chat) {
        const message = chat.messages.find(m => m.id === messageId);
        if (message && message.mine) {
          message.text = newText;
          message.edited = true;
        }
      }
    },

    deleteMessage(state, action) {
      const { chatId, messageId } = action.payload;
      const chat = state.chats.find(c => c.id === chatId);
      if (chat) {
        chat.messages = chat.messages.filter(m => m.id !== messageId);
      }
    },

    togglePinChat(state, action) {
      const chat = state.chats.find(c => c.id === action.payload);
      if (chat) {
        chat.pinned = !chat.pinned;
      }
    },

    toggleMuteChat(state, action) {
      const chat = state.chats.find(c => c.id === action.payload);
      if (chat) {
        chat.muted = !chat.muted;
      }
    },

    addToOnline(state, action) {
      if (!state.onlineUsers.includes(action.payload)) {
        state.onlineUsers.push(action.payload);
      }
    },

    removeFromOnline(state, action) {
      state.onlineUsers = state.onlineUsers.filter(id => id !== action.payload);
    },

    // Simulate receiving a message (for demo purposes)
    receiveMessage(state, action) {
      const { chatId, message } = action.payload;
      const chat = state.chats.find(c => c.id === chatId);
      if (chat) {
        chat.messages.push({
          id: uuid(),
          text: message,
          mine: false,
          sender: chat.name,
          read: false,
          sent: true,
          timestamp: new Date().toISOString(),
          edited: false,
          starred: false,
        });
      }
    },
  },
});

export const {
  setActiveChat,
  sendMessage,
  setTyping,
  replyToMessage,
  markAsRead,
  toggleStarMessage,
  editMessage,
  deleteMessage,
  togglePinChat,
  toggleMuteChat,
  addToOnline,
  removeFromOnline,
  receiveMessage,
} = chatSlice.actions;

// Thunk for simulating message responses
export const simulateResponse = (chatId) => (dispatch, getState) => {
  const responses = [
    "That's interesting! Tell me more.",
    "I'll check that right away.",
    "Sounds good to me!",
    "What time works best for you?",
    "Can you share more details about this?",
    "I agree with that approach.",
    "Let me think about it and get back to you.",
    "Perfect timing! I was just looking into that.",
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  setTimeout(() => {
    dispatch(receiveMessage({
      chatId,
      message: randomResponse,
    }));
  }, 1500 + Math.random() * 2000); // Random delay between 1.5-3.5 seconds
};

export default chatSlice.reducer;