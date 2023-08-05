<template>
  <div class="swiper-container" id="mySwiper" ref="bannerSwiper">
    <div class="swiper-wrapper">
      <div
          class="swiper-slide"
          v-for="(banner, index) in bannerList"
          :key="banner.id"
      >
        <img :src="bannerList[index].imgUrl" alt="封面"/>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: 'Carousel',
  props: ["bannerList"],
  watch: {
    bannerList: {
      // 监听 banner 轮播图数据变化，创建 swiper 实例以开启轮播图
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
          new Swiper(this.$refs.bannerSwiper, {
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>