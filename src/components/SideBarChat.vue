<template>
  <div
    class="sidebar__chat"
    @click="getCurrentChat(user)"
    v-if="user.uid !== $store.state.user.currentUser.uid"
  >
    <v-avatar icon><v-img :src="user.photoURL"></v-img></v-avatar>
    <div class="sidebar__chat_info">
      <h2>{{ user.displayName }}</h2>
      <p>Hey there, I'm using Whatsa...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBarChat",
  props: ["user"],
  methods: {
    async getCurrentChat(user) {
      this.$store.dispatch("SET_CURRENT_CHAT", user);
      
      const conversationId =
        this.$store.state.user.currentUser.uid >
        this.$store.state.chat.currentChat.uid
          ? this.$store.state.user.currentUser.uid +
            this.$store.state.chat.currentChat.uid
          : this.$store.state.chat.currentChat.uid +
            this.$store.state.user.currentUser.uid;

      this.$store.dispatch("SET_CHAT_MESSAGES", conversationId);
    },
  },
};
</script>
<style scoped>
.sidebar__chat {
  display: flex;
  padding: 15px 20px;
  cursor: pointer;
  border-bottom: 1px solid #f6f6f6;
}

.sidebar__chat:hover {
  background-color: #ebebeb;
}

.sidebar__chat_info > h2 {
  font-size: 16px;
  margin-bottom: 8px;
}

.sidebar__chat_info {
  margin-left: 15px;
}
</style>