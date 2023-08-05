import {reqUserAddress, reqGoodsList} from '@/api'

const successCode = 200

const state = {
    addressList: [],
    tradeInfo: []
}

const mutations = {
    GETUSERADDRESS(state, data) {
        state.addressList = data
    },
    GETTRADEINFO(state, data) {
        state.tradeInfo = data
    }
}

const actions = {
    async getUserAddress({commit}) {
        let result = await reqUserAddress()
        if (result.code === successCode) {
            commit('GETUSERADDRESS', result.data)
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async getTradeInfo({commit}) {
        let result = await reqGoodsList()
        if (result.code === successCode) {
            commit('GETTRADEINFO', result.data)
        } else {
            return Promise.reject(new Error('fail'))
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