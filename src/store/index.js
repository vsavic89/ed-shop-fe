import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { CartModule } from './cartModule.store';

/* eslint-disable no-new */
const store = new Vuex.Store({
  modules: {
    CartModule
  }
})

export default store