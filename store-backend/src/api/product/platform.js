import request from "@/utils/request";

// 获取一级分类列表
export const reqCategory1List = () => request({
  url: '/admin/product/getCategory1',
  method: 'get'
})

// 获取一级分类下的二级分类列表
export const reqCategory2List = (category1Id) => request({
  url: `/admin/product/getCategory2/${category1Id}`,
  method: 'get'
})

// 获取二级分类下的三级分类列表
export const reqCategory3List = (category2Id) => request({
  url: `/admin/product/getCategory3/${category2Id}`,
  method: 'get'
})

// 获取平台属性数据
export const reqPlatformAttrList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get'
})

// 保存/更新平台属性
export const reqSaveOrUpdateAttr = (data) => request({
  url: '/admin/product/saveAttrInfo',
  method: 'post',
  data
})

// 获取平台所有销售属性
export const reqSaleAttrList = () => request({
  url: '/admin/product/baseSaleAttrList',
  method: 'get'
})

// 根据 ID 删除平台销售属性
export const reqDeleteAttr = (attrId) => request({
  url: `/admin/product/deleteAttr/${attrId}`,
  method: 'delete'
})

