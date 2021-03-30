import Vue from "vue";
import Vuex from "vuex";
import userInfo from "./userInfo";
import examInfo from "./examInfo";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userInfo,
    examInfo,
  },
});
