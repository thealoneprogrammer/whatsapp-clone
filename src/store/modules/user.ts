import firebase from "firebase";
import { ShortUser } from "@/models/short_user";

const GOOGLE_AUTH_PROVIDER = new firebase.auth.GoogleAuthProvider();

export default {
  state: {
    currentUser: null,
    isLoggedIn: false,
  },
  mutations: {
    SET_USER(
      state: { currentUser: ShortUser | null },
      payload: ShortUser | null
    ) {
      state.currentUser = payload;
    },
    SET_LOGGED_IN(state: { isLoggedIn: boolean }, payload: boolean) {
      state.isLoggedIn = payload;
    },
  },
  actions: {
    SET_USER({ commit }: any) {
      firebase
        .auth()
        .signInWithPopup(GOOGLE_AUTH_PROVIDER)
        .then((user) => {
          const currentUser = {
            uid: user.user?.uid,
            displayName: user.user?.displayName,
            email: user.user?.email,
            photoURL: user.user?.photoURL,
            phoneNumber: user.user?.phoneNumber,
          };

          firebase
            .firestore()
            .collection("users")
            .doc(user.user?.uid)
            .set(currentUser);

          commit("SET_USER", currentUser);
          commit("SET_LOGGED_IN", true);
        })
        .catch((err) => {
          commit("SET_SNACKBAR", {
            showing: true,
            text: err.message,
            color: "error",
          });
        });
    },
    LOGOUT({ commit }: any) {
      firebase.auth().signOut();
      commit("SET_USER", null);
      commit("SET_LOGGED_IN", false);
    },
  },
};
