<template>
  <main>
    <OverviewSidebar></OverviewSidebar>
    <div class="center">
      <OverviewNav></OverviewNav>
      <ListHeader></ListHeader>
      <section class="list">
        <ListRow v-for="n in 10" :key="n"></ListRow>
      </section>
    </div>
  </main>
</template>

<script>
import ListRow from "@/components/UI/ListRow"
import ListHeader from "@/components/UI/ListHeader"
//
import OverviewNav from "@/components/partials/overview/Nav"
import OverviewSidebar from "@/components/navigation/sidebar/Overview"
//
import checkPageAuth from "@/middlewares/checkPageAuth"

export default {
    middlewares: [checkPageAuth],
    metaInfo() {
        return {
            title: this.$t("title.overview")
        }
    },
    components: {
        ListRow,
        ListHeader,
        OverviewNav,
        OverviewSidebar
    }
}
</script>

<style src="@/assets/css/pages/overview/index" lang="scss" scoped></style>
