<template>
    <div class="list-header">
        <div style="width: 100px">
            <input type="checkbox"
                   class="checkbox">
        </div>
        <div style="width: calc(100% - 510px)">
            <span>{{ $t('overview.list_header.name') }}</span>
        </div>
        <div style="width: 85px">
            <span></span>
        </div>
        <div style="width: 100px">
            <span>{{ $t('overview.list_header.status') }}</span>
        </div>
        <div style="width: 100px">
            <span>{{ $t('overview.list_header.size') }}</span>
        </div>
        <div style="width: 125px">
            <span>{{ $t('overview.list_header.date') }}</span>
        </div>
    </div>
</template>

<style src="~/assets/css/components/partials/OverviewListHeader.scss" lang="scss" scoped>
</style>
