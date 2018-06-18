<template>
    <div class="list-header">
        <div style="width: 100px">
            <input type="checkbox"
                   class="checkbox">
        </div>
        <div style="width: calc(100% - 510px)">
            <span>{{ $t('partials.OverviewListHeader.name') }}</span>
        </div>
        <div style="width: 85px">
            <span></span>
        </div>
        <div style="width: 100px">
            <span>{{ $t('partials.OverviewListHeader.status') }}</span>
        </div>
        <div style="width: 100px">
            <span>{{ $t('partials.OverviewListHeader.size') }}</span>
        </div>
        <div style="width: 125px">
            <span>{{ $t('partials.OverviewListHeader.date') }}</span>
        </div>
    </div>
</template>

<style src="~/assets/css/components/partials/OverviewListHeader.scss" lang="scss" scoped>
</style>
