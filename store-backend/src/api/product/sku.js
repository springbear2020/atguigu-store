import request from "@/utils/request";

// 保存 SKU
export const reqSaveSkuInfo = (sku) => request({
  url: '/admin/product/saveSkuInfo',
  method: 'post',
  data: sku
})

// 查询 SPU 下的所有 SKU
export const reqSkuListOfSpu = (spuId) => request({
  url: `/admin/product/findBySpuId/${spuId}`,
  method: 'get'
})

// 查询 SKU 分页数据
export const reqSkuPageData = (current, size) => request({
  url: `/admin/product/list/${current}/${size}`,
  method: 'get'
})

// 商品下架
export const reqGoodsOff = (skuId) => request({
  url: `/admin/product/cancelSale/${skuId}`,
  method: 'get'
})

// 商品上架
export const reqGoodsOn = (skuId) => request({
  url: `/admin/product/onSale/${skuId}`,
  method: 'get'
})

// 查看 SKU 详情
export const reqSkuDetails = (skuId) => request({
  url: `/admin/product/getSkuById/${skuId}`,
  method: 'get'
})

// 删除 SPU
export const reqDeleteSku = (skuId) => request({
  url: `/admin/product/deleteSku/${skuId}`,
  method: 'delete'
})

// 更新 SKU
export const reqUpdateSku = (sku) => request({
  url: `/admin/product/updateSkuInfo`,
  method: 'post',
  data: sku
})
