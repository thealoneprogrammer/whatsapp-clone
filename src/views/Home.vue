<template>
  <div class="app">
    <div class="app__body" v-if="isLoggedIn">
      <SideBar />
      <Chat />
    </div>
    <Login v-else />
  </div>
</template>

<script>
import Vue from "vue";
import SideBar from "@/components/SideBar.vue";
import Chat from "@/components/Chat.vue";
import Login from "@/components/Auth/SSO.vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "Home",
  computed: {
    ...mapState({ isLoggedIn: (state) => state.user.isLoggedIn }),
  },
  components: {
    SideBar,
    Chat,
    Login,
  },
});
</script>
<style scoped>
.app {
  display: grid !important;
  place-items: center !important;
  background-color: #dadbd3 !important;
  height: 100vh !important;
}

.app__body {
  display: flex;
  background-color: #ededed !important;
  width: 90vw !important;
  height: 90vh !important;
  box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.2);
}
</style>
