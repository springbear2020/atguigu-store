import request from './request'
import mock from './mock'

// 三级联动菜单列表
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' })
// 轮播图数据
export const reqBannerList = () => mock.get('/banner')
// floor 数据
export const reqFloorList = () => mock.get('/floor')
// 搜索商品信息
export const reqCommoditySearch = (conditions) => request({
    url: '/list',
    method: 'post',
    data: conditions
})