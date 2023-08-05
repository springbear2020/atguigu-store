import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'

const successCode = 200

const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}

const mutations = {
    CATEGORYLIST(state, data) {
        state.categoryList = data
    },
    BANNERLIST(state, data) {
        state.bannerList = data
    },
    FLOORLIST(state, data) {
        state.floorList = data
    }
}

const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == successCode) {
            commit('CATEGORYLIST', result.data)
        }
    },

    async bannerList({ commit }) {
        let result = await reqBannerList()
        if (result.code == successCode) {
            commit('BANNERLIST', result.data)
        }
    },

    async floorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == successCode) {
            commit('FLOORLIST', result.data)
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