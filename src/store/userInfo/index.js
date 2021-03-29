import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default {
  namespaced: true,
  state: {
    _id: null,
    status: null,
    phoneNumber: null,
    name: null,
  },
  getters,
  mutations,
  actions,
};
