<template>
    <div class="page">
        <overview-sidebar></overview-sidebar>
        <!-- ondragover="allowDrop(event)" -->
        <div class="content" dropzone="copy">
          <overview-path></overview-path>
          <overview-list-header></overview-list-header>
          <overview-list></overview-list>
        </div>
    </div>
</template>

<script>
import OverviewSidebar from '~/components/navigation/sidebar/OverviewSidebar'
import OverviewPath from '~/components/partials/OverviewPath'
import OverviewListHeader from '~/components/partials/OverviewListHeader'
import OverviewList from '~/components/partials/OverviewList'

export default {
  components: {
    OverviewSidebar,
    OverviewPath,
    OverviewListHeader,
    OverviewList
  }
}
</script>
