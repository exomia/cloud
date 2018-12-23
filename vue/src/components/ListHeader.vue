<template>
    <div class="list-row header" :class="hideInformations ? 'info-active' : ''">
        <div class="list-item"><input type="checkbox" /></div>

        <div class="list-item" @click="toggleOrderType()">
            <span>Typ</span>
            <DropdownIcon
                class="dropdown"
                :class="[isOrderTypeActive ? (orderTypeDesc ? 'shown' : 'shown active') : '']"
            ></DropdownIcon>
        </div>

        <div
            class="list-item"
            :class="hideInformations ? 'info-active' : 'relative'"
            @click="toggleOrderName()"
        >
            <span>{{ $t('components.ListHeader.name') }}</span>
            <DropdownIcon
                class="dropdown"
                :class="[isOrderNameActive ? (orderNameDesc ? 'shown' : 'shown active') : '']"
            ></DropdownIcon>
        </div>

        <div class="dynamic-list-menu" :style="hideInformations ? 'width: auto' : ''">
            <div class="list-item"></div>

            <div v-if="!hideInformations" class="list-item" @click="toggleOrderSize()">
                <span>{{ $t('components.ListHeader.size') }}</span>
                <DropdownIcon
                    class="dropdown"
                    :class="[isOrderSizeActive ? (orderSizeDesc ? 'shown' : 'shown active') : '']"
                ></DropdownIcon>
            </div>

            <div v-if="!hideInformations" class="list-item" @click="toggleOrderDate()">
                <span>{{ $t('components.ListHeader.date') }}</span>
                <DropdownIcon
                    class="dropdown"
                    :class="[isOrderDateActive ? (orderDateDesc ? 'shown' : 'shown active') : '']"
                ></DropdownIcon>
            </div>
        </div>
    </div>
</template>

<script>
/* Imports */
import { mapGetters } from 'vuex'

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
    },
    computed: {
        ...mapGetters([
            'isOrderTypeActive',
            'orderTypeDesc',
            'isOrderNameActive',
            'orderNameDesc',
            'isOrderSizeActive',
            'orderSizeDesc',
            'isOrderDateActive',
            'orderDateDesc'
        ])
    },
    methods: {
        toggleOrderType: function() {
            if (!this.isOrderTypeActive) {
                this.$store.commit('setOrderTypeActive')
                this.$store.commit('setOrderTypeDesc', true)
            } else {
                if (this.orderTypeDesc) {
                    this.$store.commit('setOrderTypeDesc', !this.orderTypeDesc)
                } else {
                    this.$store.commit('setOrderTypeDesc', !this.orderTypeDesc)
                    this.$store.commit('setOrderTypeActive', false)
                }
            }
        },
        toggleOrderName: function() {
            if (!this.isOrderNameActive) {
                this.$store.commit('setOrderNameActive')
                this.$store.commit('setOrderNameDesc', true)
            } else {
                if (this.orderNameDesc) {
                    this.$store.commit('setOrderNameDesc', !this.orderNameDesc)
                } else {
                    this.$store.commit('setOrderNameDesc', !this.orderNameDesc)
                    this.$store.commit('setOrderNameActive', false)
                }
            }
        },
        toggleOrderSize: function() {
            if (!this.isOrderSizeActive) {
                this.$store.commit('setOrderSizeActive')
                this.$store.commit('setOrderSizeDesc', true)
            } else {
                if (this.orderSizeDesc) {
                    this.$store.commit('setOrderSizeDesc', !this.orderSizeDesc)
                } else {
                    this.$store.commit('setOrderSizeDesc', !this.orderSizeDesc)
                    this.$store.commit('setOrderSizeActive', false)
                }
            }
        },
        toggleOrderDate: function() {
            if (!this.isOrderDateActive) {
                this.$store.commit('setOrderDateActive')
                this.$store.commit('setOrderDateDesc', true)
            } else {
                if (this.orderDateDesc) {
                    this.$store.commit('setOrderDateDesc', !this.orderDateDesc)
                } else {
                    this.$store.commit('setOrderDateDesc', !this.orderDateDesc)
                    this.$store.commit('setOrderDateActive', false)
                }
            }
        }
    }
}
</script>

<style src="@/assets/scss/components/ListRow.scss" lang="scss"></style>
