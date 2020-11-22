<template>
  <div class="login">
    <div class="login__container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/766px-WhatsApp.svg.png"
        alt=""
      />
      <div class="login__text">
        <h1>Sign in to WhatsApp</h1>
      </div>
      <v-btn @click="signInwithGoogle"
        ><v-img
          class="login__btn_img"
          src="https://img1.pnghut.com/4/11/17/4S0MsWY0iw/brand-text-google-drive-gmail-cloud-platform.jpg"
        ></v-img
        >Sign in with Google</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Login",
  methods: {
    signInwithGoogle() {
      this.$store.dispatch("SET_USER");
    },
  },
});
</script>

<style scoped>
.login {
  background-color: #f8f8f8;
  display: grid;
  place-items: center;
  border-radius: 10px;
}

.login__container {
  padding: 100px;
  text-align: center;
  background: white;
  border-radius: 10px;
  box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.2);
}

.login__container > img {
  object-fit: contain;
  height: 150px;
  margin-bottom: 40px;
}

.login__container > button {
  margin-top: 50px;
}

.login__btn_img {
  width: 30px;
  margin-right: 5px;
}
</style>