<template>
  <div>
    <TopCard></TopCard>
    <CenterCard></CenterCard>
    <BottomCard></BottomCard>
  </div>
</template>

<script>
import TopCard from "@/views/dashboard/top";
import CenterCard from "@/views/dashboard/center";
import BottomCard from '@/views/dashboard/bottom'

export default {
  name: 'Dashboard',
  components: {TopCard, CenterCard, BottomCard},
}
</script>

<style lang="scss" scoped>
</style>
