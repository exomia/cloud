<template>
    <div class="list-row header">

        <div class="list-item">
            <input type="checkbox">
        </div>

        <div class="list-item">
            <span>Typ</span>
            <DropdownIcon class="dropdown"></DropdownIcon>
        </div>

        <div class="list-item stretch">
            <span>Name</span>
            <DropdownIcon class="dropdown"></DropdownIcon>
        </div>

        <div class="dynamic-list-menu">

            <div class="list-item"></div>

            <div class="list-item">
                <span>Größe</span>
                <DropdownIcon class="dropdown"></DropdownIcon>
            </div>

            <div class="list-item">
                <span>Datum</span>
                <DropdownIcon class="dropdown"></DropdownIcon>
            </div>

        </div>
    </div>
</template>

<script>
/* SVG */
import DropdownIcon from "@/assets/img/icon/overview/dropdown.svg"

export default {
    components: {
        DropdownIcon
    }
}
</script>

<style src="@/assets/css/components/UI/ListRow" lang="scss"></style>
