<template>
    <main>
        <overview-sidebar></overview-sidebar>
        <!-- ondragover="allowDrop(event)" -->
        <div class="overview" dropzone="copy">
          <overview-path></overview-path>
          <overview-list-header></overview-list-header>
          <overview-list></overview-list>
        </div>
    </main>
</template>

<script>
import OverviewSidebar from '~/components/navigation/sidebar/OverviewSidebar'
import OverviewPath from '~/components/partials/OverviewPath'
import OverviewListHeader from '~/components/partials/OverviewListHeader'
import OverviewList from '~/components/partials/OverviewList'

export default {
    auth: true,
    components: {
        OverviewSidebar,
        OverviewPath,
        OverviewListHeader,
        OverviewList
    }
}
</script>

<style src="~/assets/css/pages/overview/index.scss" lang="scss" scoped />
