<template>
  <div class="swiper-container" ref="bannerSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in skuImageList" :key="img.id">
        <img :src="img.imgUrl" alt="phone" :class="{active: curIndex === index}" @click="changeImage(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "ImageList",
  props: ['skuImageList'],
  data() {
    return {
      curIndex: 0
    }
  },
  watch: {
    skuImageList: {
      // 监听 banner 轮播图数据变化，创建 swiper 实例以开启轮播图
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
          new Swiper(this.$refs.bannerSwiper, {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            slidesPerView: 3,
            slidesPerGroup: 1
          });
        });
      },
    },
  },
  methods: {
    changeImage(index) {
      this.curIndex = index
      // 通知兄弟组件 Zoom 切换图片
      this.$bus.$emit('changePic', index)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>