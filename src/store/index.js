import Vue from 'vue'
import Vuex from 'vuex'
import student from './student'
import teacher from './teacher'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    student,
    teacher
  }
})
