import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex, VueAxios, axios)

const state = {
  workList: [],
  todos: [],
  projects: [],
  allProjects: [],
  companies: [],
  selectedCompany: null,
  selectedProject: null,
  users: [],
  authenticated: false,
  confirmed: false,
  error: false,
  user: null
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
