import {reqCommoditySearch} from "@/api"

const successCode = 200

const state = {
    searchList: {}
}

const mutations = {
    COMMODITYSEARCH(state, searchList) {
        state.searchList = searchList
    }
}

const actions = {
    async commoditySearch({commit}, conditions = {}) {
        let result = await reqCommoditySearch(conditions)
        if (result.code === successCode) {
            commit('COMMODITYSEARCH', result.data)
        }
    }
}

const getters = {
    trademarkList() {
        return state.searchList.trademarkList || []
    },
    goodsList() {
        return state.searchList.goodsList || []
    },
    attrsList() {
        return state.searchList.attrsList || []
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}

