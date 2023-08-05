import { reqCategoryList } from '@/api'

const state = {
    categoryList: []
}

const mutations = {
    CATEGORYLIST(state, data) {
        state.categoryList = data
    }
}

const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}