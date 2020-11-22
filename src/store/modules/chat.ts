import firebase from "firebase";
import { ShortUser } from "@/models/short_user";
import { Chat } from "@/models/chat";

export default {
  state: {
    chatUsers: [],
    chatMessages: [],
    currentChat: null,
    coversationId: null,
  },
  mutations: {
    SET_CHAT_USERS(state: { chatUsers: [] }, payload: []) {
      state.chatUsers = payload;
    },

    SET_CURRENT_CHAT(state: { currentChat: ShortUser }, payload: ShortUser) {
      state.currentChat = payload;
    },

    SET_CHAT_MESSAGES(
      state: { chatMessages: []; conversationId: string },
      payload: { messages: []; conversationId: string }
    ) {
      state.chatMessages = [];
      state.chatMessages = payload.messages;
      state.conversationId = payload.conversationId;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    UPDATE_CHAT_MESSAGES(state: { chatMessages: any }, payload: Chat) {
      state.chatMessages = [];
      state.chatMessages = payload;
    },
  },
  actions: {
    SET_CHAT_USERS({ commit }: any) {
      const allUsers: firebase.firestore.DocumentData[] = [];
      firebase
        .firestore()
        .collection("users")
        .onSnapshot((snapshot) => {
          snapshot.forEach((document) => {
            allUsers.push(document.data());
          });
        });
      commit("SET_CHAT_USERS", allUsers);
    },

    SET_CURRENT_CHAT({ commit }: any, payload: ShortUser) {
      commit("SET_CURRENT_CHAT", payload);
    },

    SET_CHAT_MESSAGES({ commit }: any, payload: string) {
      firebase
        .firestore()
        .collection("chats")
        .doc(payload)
        .collection("messages")
        .orderBy("timestamp")
        .onSnapshot((snapshot) => {
          const messages: (firebase.firestore.DocumentData | undefined)[] = [];
          snapshot.size === 0
            ? commit("SET_CHAT_MESSAGES", {
                messages: messages,
                conversationId: payload,
              })
            : snapshot.forEach((document) => {
                messages.push(document.data());
                commit("SET_CHAT_MESSAGES", {
                  messages: messages,
                  conversationId: payload,
                });
              });
        });
    },

    UPDATE_CHAT_MESSAGES({ commit }: any, payload: { chat: Chat; id: string }) {
      firebase
        .firestore()
        .collection("chats")
        .doc(payload.id)
        .collection("messages")
        .add(payload.chat);
      commit("UPDATE_CHAT_MESSAGES", payload.chat);
    },
  },
};
