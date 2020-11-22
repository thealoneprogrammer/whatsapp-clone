<template>
  <div class="no__chat_selected" v-if="currentChat === null" id="el">
    <img
      class="no__chat_selcted_img"
      src="@/assets/images/intro-connection-light.jpg"
      alt=""
    />
    <div class="no__chat_selected_text">
      <h2>Keep your phone connected</h2>
      <span
        >Whatsapp connects to your phone to sync messages. To reduce data usage,
        connect your phone to Wi-Fi.</span
      >
    </div>
  </div>
  <div class="chat" v-else>
    <div class="chat__header">
      <v-avatar><v-img :src="currentChat.photoURL"></v-img></v-avatar>
      <div class="chat__header_info">
        <h3>{{ currentChat.displayName }}</h3>
        <p>Last Seen at...</p>
      </div>
      <div class="chat__header_right">
        <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-attachment</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
      </div>
    </div>
    <div class="chat__body" ref="container">
      <div
        class="first__time_chat"
        v-if="$store.state.chat.chatMessages.length === 0"
      >
        <p>
          You have no conversation with
          {{ $store.state.chat.currentChat.displayName }}. Initiate the
          conversation by sending a message.
        </p>
      </div>
      <p
        v-for="(message, index) in $store.state.chat.chatMessages"
        :key="index"
        :class="
          message.senderId === $store.state.user.currentUser.uid
            ? 'chat__sender chat__message'
            : 'chat__reciever chat__message'
        "
      >
        {{ message.message }}
        <span class="chat__timestamp">{{ message.time }}</span>
      </p>
    </div>
    <div class="chat__footer">
      <emoji-picker @emoji="append" :search="search">
        <v-btn
          icon
          class="emoji-invoker"
          slot="emoji-invoker"
          slot-scope="{ events: { click: clickEvent } }"
          @click.stop="clickEvent"
          ><v-icon>mdi-emoticon-happy-outline</v-icon></v-btn
        >

        <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
          <div
            class="emoji-picker"
            :style="{ top: '61%', left: display.x + 'px' }"
          >
            <div class="emoji-picker__search">
              <input type="text" v-model="search" v-focus />
            </div>
            <div>
              <div v-for="(emojiGroup, category) in emojis" :key="category">
                <h5>{{ category }}</h5>
                <div class="emojis">
                  <span
                    v-for="(emoji, emojiName) in emojiGroup"
                    :key="emojiName"
                    @click="insert(emoji)"
                    :title="emojiName"
                    >{{ emoji }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </emoji-picker>
      <v-form @submit.prevent="submit">
        <input type="text" placeholder="Type a message" v-model="message" />
        <v-btn icon @click="submit"><v-icon>mdi-send</v-icon></v-btn>
      </v-form>
      <v-btn icon><v-icon>mdi-microphone</v-icon></v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EmojiPicker from "vue-emoji-picker";

export default {
  name: "Chat",
  components: {
    EmojiPicker,
  },

  computed: {
    ...mapState({ currentChat: (state) => state.chat.currentChat }),
  },

  updated() {
    this.$store.state.chat.conversationId !== null &&
    this.$store.state.chat.conversationId !== undefined
      ? this.scrollToEnd()
      : null;
  },
  mounted() {
    this.$store.state.chat.conversationId !== null &&
    this.$store.state.chat.conversationId !== undefined
      ? this.scrollToEnd()
      : null;
  },
  data: () => ({
    message: "",
    search: "",
  }),
  methods: {
    scrollToEnd() {
      const content = this.$refs.container;
      content.scrollTop = content.scrollHeight;
    },
    append(emoji) {
      this.message += emoji;
    },
    submit() {
      if (this.message === null || this.message === " ") {
        return;
      }
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      const strTime = hours + ":" + minutes + " " + ampm;
      const chat = {
        id: +new Date(),
        date: now.toISOString().substr(0, 10),
        time: strTime,
        timestamp: +new Date(),
        message: this.message,
        senderId: this.$store.state.user.currentUser.uid,
        receiverId: this.$store.state.chat.currentChat.uid,
      };
      this.$store.dispatch("UPDATE_CHAT_MESSAGES", {
        chat: chat,
        id: this.$store.state.chat.conversationId,
      });
      this.message = "";
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>

<style scoped>
.first__time_chat {
  padding: 8px;
  text-align: center;
  height: 50px;
  background-color: #fdf3c5;
  border-radius: 10px;
  color: #525252;
}

.no__chat_selected {
  flex: 0.65;
  margin: auto;
  text-align: center;
}

.no__chat_selected_text {
  text-align: center;
  margin-top: 10px;
}

.no__chat_selected_text > h2 {
  font-weight: 200 !important;
  font-size: 28px !important;
  color: #525252 !important;
  margin-bottom: 10px;
}

.no__chat_selected_text > span {
  color: #00000073;
}

.no__chat_selcted_img {
  width: 40%;
  border-radius: 50%;
}

.chat {
  flex: 0.65;
  display: flex;
  flex-direction: column;
}

.chat__header {
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgrey;
}

.chat__header_info {
  flex: 1;
  padding-left: 20px;
}

.chat__header_info > h3 {
  margin-bottom: 3px;
  font-weight: bold;
}

.chat__header_info > p {
  color: gray;
}

.chat__header_right {
  display: flex;
  justify-content: center;
  min-width: 100px;
}

.chat__body {
  flex: 1;
  background-image: url("https://github-production-user-asset-6210df.s3.amazonaws.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  background-position: center;
  background-repeat: repeat;
  padding: 30px;
  overflow: scroll;
}

.chat__message {
  position: relative;
  font-size: 16px;
  padding: 10px;
  border-radius: 10px;
  background-color: #ffffff;
  width: fit-content;
  margin-bottom: 30px;
}

.chat__sender:after {
  content: "";
  position: absolute;
  margin-top: -6px;
  margin-left: -5px;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid #dcf8c6 !important;
  transform: rotate(-42deg);
  right: -10px;
  top: 4px;
}

.chat__reciever:after {
  content: "";
  position: absolute;
  margin-top: -6px;
  margin-left: -5px;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid #ffffff !important;
  transform: rotate(42deg);
  left: -6px;
  top: 4px;
}

.chat__sender {
  margin-left: auto;
  background-color: #dcf8c6;
}

.chat__timestamp {
  margin-left: 10px;
  font-size: xx-small;
}

.chat__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  border-top: 1px solid lightgrey;
}

.chat__footer > form {
  flex: 1;
  display: flex;
}

.chat__footer > form > input {
  flex: 1;
  border-radius: 30px;
  padding: 10px;
  border: none;
}

.emoji-invoker {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.emoji-invoker:hover {
  transform: scale(1.1);
}

.emoji-picker {
  position: absolute;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 15rem;
  height: 20rem;
  overflow: scroll;
  padding-left: 30px;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
  padding-top: 10px;
}

.emoji-picker__search {
  display: flex;
}

.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}

.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}

.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}

.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}

.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>