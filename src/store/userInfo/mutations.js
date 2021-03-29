const mutations = {
  updateId(state, _id) {
    state._id = _id;
  },
  updateStatus(state, status) {
    console.log("=====", status);
    state.status = status;
  },
  updatePhoneNumber(state, phoneNumber) {
    state.phoneNumber = phoneNumber;
  },
  updateName(state, name) {
    state.name = name;
  },
};
export default mutations;
