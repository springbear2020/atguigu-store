<template>
  <div>
    <div class="header">
      <span>搜索用户数
        <svg t="1670310727847" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="5852" width="20" height="20">
          <path
            d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z"
            p-id="5853" fill="#d4237a">
          </path>
        </svg>
      </span>
    </div>
    <div class="main" style="margin: 20px 0">
      <span>12306</span>&nbsp;&nbsp;&nbsp;
      <span>17.1
        <svg t="1670310623442" class="icon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="3827" width="16" height="16"><path
          d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"
          p-id="3828" fill="#1afa29"></path>
        </svg>
      <svg t="1670310645890" class="icon" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg" p-id="4794" width="16" height="16"><path
        d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z"
        p-id="4795" fill="#d81e06"></path>
      </svg>
      </span>
    </div>
    <div class="footer" style="width: 100%; height: 50px;">
      <LineCharts></LineCharts>
    </div>
  </div>
</template>

<script>

import LineCharts from "@/components/charts/LineCharts";

export default {
  name: "BottomCharts",
  components: {LineCharts},
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
</style>
