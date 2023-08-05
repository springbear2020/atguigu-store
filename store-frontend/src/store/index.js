import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import cart from './cart'
import user from './user'
import order from './order'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {home, search, detail, cart, user, order}
})