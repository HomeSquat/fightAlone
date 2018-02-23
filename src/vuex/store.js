import Vue from 'vue'
import Vuex from 'vuex'

import rootActions from './actions'
import rootMutations from './mutations'

//modules
import test from './modules/test'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    strict: debug,
    mutations: rootMutations,
    actions: rootActions,
    modules: {
        test
    }
})