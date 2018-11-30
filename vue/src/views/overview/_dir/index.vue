<template>
    <main>
        <OverviewSidebar></OverviewSidebar>
        <div class="center">
            <OverviewNav></OverviewNav>
            <section class="list">
                <div class="side">
                    <ListHeader :hideInformations="hideInformations"></ListHeader>
                    <ListHeaderInfo v-if="hideInformations"></ListHeaderInfo>
                </div>
                <div class="side">
                    <div class="row-wrapper">
                        <ListRow
                            v-for="el in getDirectoryData"
                            :hideInformations="hideInformations"
                            :key="el.uuid"
                            :uuid="el.uuid"
                            :name="el.name"
                            :type="el.type"
                            :size="el.size"
                            :timestamp="el.timestamp"
                            :extension="el.extension"
                        ></ListRow>
                    </div>
                    <ListRowInfo v-if="hideInformations"></ListRowInfo>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
import ListRow from "@/components/UI/ListRow";
import ListRowInfo from "@/components/UI/ListRowInfo";
import ListHeader from "@/components/UI/ListHeader";
import ListHeaderInfo from "@/components/UI/ListHeaderInfo";
//
import OverviewNav from "@/components/partials/overview/Nav";
import OverviewSidebar from "@/components/navigation/sidebar/Overview";
//
import checkAuth from "@/middlewares/checkAuth";

import { mapGetters } from "vuex";

export default {
    middlewares: [checkAuth],
    async asyncData({ store, http, route }) {
        const { data } = await http.get(
            `/v1/directory/${route.params.dir || ""}`
        );
        if (data) {
            await store.commit("setDirectoryData", data);
        }
    },
    metaInfo() {
        return {
            title: this.$t("title.overview")
        };
    },
    data() {
        return {
            hideInformations: true
        };
    },
    computed: {
        ...mapGetters([
            "getDirectoryData",
            "getDirectoryCount",
            "getFileCount",
            "sizeSum"
        ])
    },
    components: {
        ListRow,
        ListRowInfo,
        ListHeader,
        ListHeaderInfo,
        OverviewNav,
        OverviewSidebar
    }
};
</script>

<style src="@/assets/css/pages/overview/index" lang="scss" scoped></style>
