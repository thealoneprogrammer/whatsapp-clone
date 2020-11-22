import { Snackbar } from "@/models/snackbar";

export default {
  state: {
    snackbar: {},
  },
  mutations: {
    SET_SNACKBAR(state: { snackbar: Snackbar }, payload: Snackbar) {
      state.snackbar = payload;
    },
  },
  actions: {
    SET_SNACKBAR({ commit }: any, payload: Snackbar) {
      commit("SET_SNACKBAR", payload);
    },
  },
};
