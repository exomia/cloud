<template>
  <main>
    <OverviewSidebar></OverviewSidebar>
    <div class="center">
      <OverviewNav></OverviewNav>
      <ListHeader></ListHeader>
      <section class="list">
        <ListRow
          v-for="el in getDirectoryData"
          :key="el.uuid"
          :uuid="el.uuid"
          :name="el.name"
          :type="el.type"
          :size="el.size"
          :timestamp="el.timestamp"
          :extension="el.extension"
        ></ListRow>
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

import { mapGetters } from "vuex"

export default {
    middlewares: [checkPageAuth],
    async asyncData({ store, http, route }) {
        const { data } = await http.get(`/v1/directory/${route.params.dir || ""}`)
        if (data) {
            await store.commit("setDirectoryData", data)
        }
    },
    metaInfo() {
        return {
            title: this.$t("title.overview"),
        }
    },
    computed: {
        ...mapGetters(["getDirectoryData", "getDirectoryCount", "getFileCount", "sizeSum"]),
    },
    components: {
        ListRow,
        ListHeader,
        OverviewNav,
        OverviewSidebar,
    },
}
</script>

<style src="@/assets/css/pages/overview/index" lang="scss" scoped></style>
