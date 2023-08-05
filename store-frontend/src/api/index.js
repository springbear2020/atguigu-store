import request from './request'

// 三级联动菜单列表
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' })