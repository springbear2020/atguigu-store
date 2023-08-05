import {reqGoodDetail} from '@/api'
import {guestUUID} from '@/utils/uuid'

const successCode = 200

const state = {
    goodInfo: {},
    guestUUID: guestUUID()
}

const mutations = {
    GETGOODINFO(state, data) {
        state.goodInfo = data
    }
}

const actions = {
    async getGoodInfo({commit}, skuId) {
        let result = await reqGoodDetail(skuId)
        if (result.code === successCode) {
            commit('GETGOODINFO', result.data)
        }
    }
}

const getters = {
    categoryView() {
        return state.goodInfo.categoryView || {}
    },
    skuInfo() {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList() {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}