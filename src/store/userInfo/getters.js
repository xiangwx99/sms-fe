const getters = {
  get_id(state) {
    return state._id;
  },
  getStatus(state) {
    return state.status;
  },
  phoneNumber(state) {
    return state.phoneNumber;
  },
  getName(state) {
    return state.name;
  },
};

export default getters;
