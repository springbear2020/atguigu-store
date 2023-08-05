import request from "@/utils/request";

// 获取品牌分页数据
export const reqBrandPageData = (current, size) => request({
  url: `/admin/product/baseTrademark/${current}/${size}`,
  method: 'get'
})

// 添加/编辑品牌
export const reqAddOrUpdateBrand = (brand) => {
  if (brand.id) {
    // 修改品牌
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data: brand
    })
  } else {
    // 新增品牌
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data: brand
    })
  }
};

// 删除品牌
export const reqDeleteBrand = (bid) => request({
  url: `/admin/product/baseTrademark/remove/${bid}`,
  method: 'delete'
})

// 获取所有品牌信息
export const reqBrandList = () => request({
  url: '/admin/product/baseTrademark/getTrademarkList',
  method: 'get'
})

