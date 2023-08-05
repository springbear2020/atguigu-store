import request from "@/utils/request";

// 获取 SPU 分页列表数据
export const reqSpuPageData = (current, size, category3Id) => request({
  url: `/admin/product/${current}/${size}`,
  method: 'get',
  params: {category3Id}
})

// 通过 spuId 获取 SPU 详情
export const reqSpuDetail = (spuId) => request({
  url: `/admin/product/getSpuById/${spuId}`,
  method: 'get'
})

// 通过 spuId 查询 SPU 下的图片列表
export const reqSpuImageList = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'get'
})

// 保存 SPU 或据 spuId 更新 SPU 信息
export const reqSaveOfUpdateSpu = (spu) => {
  // 存在 spuId 为修改 SPU
  if (spu.id) {
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data: spu
    })
  } else {
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data: spu
    })
  }
}

// 根据 id 删除 SPU
export const reqDeleteSpu = (spuId) => request({
  url: `/admin/product/deleteSpu/${spuId}`,
  method: 'delete'
})
