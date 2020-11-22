<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase";

export default Vue.extend({
  name: "App",

  components: {},
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
        };
        this.$store.commit("SET_USER", currentUser);
        this.$store.commit("SET_LOGGED_IN", true);
        this.$store.dispatch("SET_CHAT_USERS");
      }
    });
  },
  data: () => ({
    //
  }),
});
</script>

<style scoped>
</style>
