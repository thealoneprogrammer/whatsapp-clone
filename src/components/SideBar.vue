<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <v-avatar icon><v-img :src="currentUser.photoURL"></v-img></v-avatar>
      <div class="sidebar__header_right">
        <v-btn icon><v-icon>mdi-chart-donut</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-message-text</v-icon></v-btn>
        <div class="dropdown">
          <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
          <div class="dropdown-content">
            <p @click="logout">Logout</p>
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar__search">
      <div class="sidebar__search_container">
        <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
        <input type="text" placeholder="Search or start a new chat" />
      </div>
    </div>
    <div class="sidebar__chats">
      <SideBarChat
        v-for="(user, index) in $store.state.chat.chatUsers"
        :key="index"
        :user="user"
      />
    </div>
  </div>
</template>

<script>
import SideBarChat from "./SideBarChat.vue";
import { mapState } from "vuex";

export default {
  name: "SideBar",
  components: {
    SideBarChat,
  },
  computed: {
    ...mapState({ currentUser: (state) => state.user.currentUser }),
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT");
    },
  },
};
</script>

<style scoped>
.sidebar {
  flex: 0.35;
}

.sidebar__header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-right: 1px solid lightgray;
}

.sidebar__header_right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 10vw;
}

.sidebar__search {
  display: flex;
  align-items: center;
  background-color: #f6f6f6 !important;
  height: 39px;
  padding: 10px;
}

.sidebar__search_container {
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 35px;
  border-radius: 20px;
}

.sidebar__search_container > input {
  border: none;
  margin-left: 10px;
}

.sidebar__chats {
  flex: 1;
  overflow-y: scroll;
  background-color: white;
  height: 79%;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content > p {
  cursor: pointer;
}
</style>