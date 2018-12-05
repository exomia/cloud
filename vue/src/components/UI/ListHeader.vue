<template>
    <div class="list-row header" :class="hideInformations ? 'info-active' : ''">
        <div class="list-item">
            <input type="checkbox">
        </div>

        <div class="list-item">
            <span>Typ</span>
            <DropdownIcon class="dropdown"></DropdownIcon>
        </div>

        <div class="list-item" :class="hideInformations ? 'info-active' : 'relative'">
            <span>Name</span>
            <DropdownIcon class="dropdown"></DropdownIcon>
        </div>

        <div class="dynamic-list-menu" :style="hideInformations ? 'width: auto' : ''">
            <div class="list-item"></div>

            <div v-if="!hideInformations" class="list-item">
                <span>Größe</span>
                <DropdownIcon class="dropdown"></DropdownIcon>
            </div>

            <div v-if="!hideInformations" class="list-item">
                <span>Datum</span>
                <DropdownIcon class="dropdown"></DropdownIcon>
            </div>
        </div>
    </div>
</template>

<script>
/* SVG */
import DropdownIcon from '@/assets/img/icon/overview/dropdown.svg'

export default {
    components: {
        DropdownIcon
    },
    props: {
        hideInformations: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style src="@/assets/css/components/UI/ListRow" lang="scss">
</style>
