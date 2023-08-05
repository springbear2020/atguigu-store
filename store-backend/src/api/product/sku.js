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
