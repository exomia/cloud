<template>
    <main>
        <TheOverviewSidebar></TheOverviewSidebar>
        <div class="center">
            <TheOverviewNavigation></TheOverviewNavigation>
            <section class="list">
                <div class="side">
                    <ListHeader :hide-informations="hideInformations"></ListHeader>
                    <ListHeaderInfo
                        v-if="hideInformations"
                        @close="hideInformations = false"
                    ></ListHeaderInfo>
                </div>
                <div class="side">
                    <div class="row-wrapper" :class="!hideInformations ? 'info-active' : ''">
                        <ListRow
                            v-for="el in getDirectoryData"
                            :key="'El-' + el.uuid"
                            :hide-informations="hideInformations"
                            :uuid="el.uuid"
                            :name="el.name"
                            :type="el.type"
                            :size="el.size"
                            :timestamp="el.timestamp"
                            :extension="el.extension"
                            @info="openInfo(el)"
                        ></ListRow>
                    </div>
                    <ListRowInfo
                        v-if="hideInformations"
                        :uuid="infoData.uuid"
                        :name="infoData.name"
                        :type="infoData.type"
                        :size="infoData.size"
                        :timestamp="infoData.timestamp"
                        :extension="infoData.extension"
                    ></ListRowInfo>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
/* Import */
import { mapGetters } from 'vuex'

/* Components */
import ListRow from '@/components/ListRow'
import ListRowInfo from '@/components/ListRowInfo'
import ListHeader from '@/components/ListHeader'
import ListHeaderInfo from '@/components/ListHeaderInfo'
//
import TheOverviewNavigation from '@/views/_overview/components/TheOverviewNavigation'
import TheOverviewSidebar from '@/views/_overview/components/TheOverviewSidebar'

export default {
    async asyncData({ store, http, route }) {
        const { data } = await http.get(`/v1/directory/${route.params.dir || ''}`)
        if (data) {
            await store.commit('setDirectoryData', data)
        }
    },
    metaInfo() {
        return {
            title: this.$t('title.overview')
        }
    },
    components: {
        ListRow,
        ListRowInfo,
        ListHeader,
        ListHeaderInfo,
        TheOverviewNavigation,
        TheOverviewSidebar
    },
    data() {
        return {
            hideInformations: false,
            infoData: {}
        }
    },
    computed: {
        ...mapGetters(['getDirectoryData', 'getDirectoryCount', 'getFileCount', 'sizeSum'])
    },
    methods: {
        openInfo: function(data) {
            // Assign
            this.infoData = data

            // Open
            const self = this
            this.$nextTick(function() {
                self.hideInformations = true
            })
        }
    }
}
</script>

<style src="@/views/_overview/index.scss" lang="scss" scoped></style>
