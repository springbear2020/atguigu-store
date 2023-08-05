import {reqAddOrUpdateCart, reqCartList, reqDeleteCartItem, reqUpdateCartCheckStatus} from '@/api'

const successCode = 200

const state = {
    cartListArr: []
}

const mutations = {
    CARTLIST(state, data) {
        state.cartListArr = data
    }
}

const actions = {
    async addCartItem({commit}, {skuId, skuNum}) {
        let result = await reqAddOrUpdateCart(skuId, skuNum);
        if (result.code === successCode) {
            return 'success'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async getCartList({commit}) {
        let result = await reqCartList()
        if (result.code === successCode) {
            commit("CARTLIST", result.data)
        }
    },
    async deleteCartItem({commit}, skuId) {
        let result = await reqDeleteCartItem(skuId);
        if (result.code === successCode) {
            return "success";
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    async updateCheckStatus({commit}, {skuId, isChecked}) {
        let result = await reqUpdateCartCheckStatus(skuId, isChecked);
        if (result.code === successCode) {
            return "success";
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 删除选中的商品
    deleteCheckedItems({dispatch, getters}) {
        let promiseAll = []
        getters.cartListObj.cartInfoList.forEach(item => {
            // 仅删除选中的商品
            let promise = item.isChecked === 1 ? dispatch('deleteCartItem', item.skuId) : '';
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    },
    // 全选 | 全不选
    checkAllItems({dispatch, getters}, {checkStatus}) {
        let promiseAll = []
        getters.cartListObj.cartInfoList.forEach(item => {
            // 更新状态不等于 checkStatus 的商品选中属性
            let promise = item.isChecked !== checkStatus ? dispatch('updateCheckStatus', {
                skuId: item.skuId,
                isChecked: checkStatus
            }) : '';
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}

const getters = {
    cartListObj(state) {
        return state.cartListArr[0] || {}
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}