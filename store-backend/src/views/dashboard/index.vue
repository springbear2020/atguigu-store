<template>
  <div>
    <TopCard></TopCard>
    <CenterCard></CenterCard>
  </div>
</template>

<script>
import TopCard from "@/views/dashboard/top";
import CenterCard from "@/views/dashboard/center";

export default {
  name: 'Dashboard',
  components: {TopCard, CenterCard},
}
</script>

<style lang="scss" scoped>
</style>
