<template>
    <div class="list-header">
        <div style="width: 100px">
            <input type="checkbox"
                   class="checkbox"
                   v-model="checked">
        </div>
        <div style="width: calc(100% - 510px)">
            <div @click="toggleOrderName()">
                <span>{{ $t('partials.OverviewListHeader.name') }}</span>
                <i class="dropdown"
                   :class="[isOrderNameActive ? (orderNameDesc ? 'dropdown-shown' :  'dropdown-active dropdown-shown') : '']"></i>
            </div>
        </div>
        <div style="width: 85px">
            <span></span>
        </div>
        <div style="width: 100px">
            <div @click="toggleOrderStatus()">
                <span>{{ $t('partials.OverviewListHeader.status') }}</span>
                <i class="dropdown"
                   :class="[isOrderStatusActive ? (orderStatusDesc ? 'dropdown-shown' :  'dropdown-active dropdown-shown') : '']"></i>
            </div>
        </div>
        <div style="width: 100px">
            <div @click="toggleOrderSize()">
                <span>{{ $t('partials.OverviewListHeader.size') }}</span>
                <i class="dropdown"
                   :class="[isOrderSizeActive ? (orderSizeDesc ? 'dropdown-shown' :  'dropdown-active dropdown-shown') : '']"></i>
            </div>
        </div>
        <div style="width: 125px">
            <div @click="toggleOrderDate()">
                <span>{{ $t('partials.OverviewListHeader.date') }}</span>
                <i class="dropdown"
                   :class="[isOrderDateActive ? (orderDateDesc ? 'dropdown-shown' :  'dropdown-active dropdown-shown') : '']"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            checked: false
        }
    },
    computed: {
        ...mapGetters([
            'isOrderNameActive',
            'orderNameDesc',
            'isOrderStatusActive',
            'orderStatusDesc',
            'isOrderSizeActive',
            'orderSizeDesc',
            'isOrderDateActive',
            'orderDateDesc'
        ])
    },
    methods: {
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
        toggleOrderStatus: function() {
            if (!this.isOrderStatusActive) {
                this.$store.commit('setOrderStatusActive')
                this.$store.commit('setOrderStatusDesc', true)
            } else {
                if (this.orderStatusDesc) {
                    this.$store.commit('setOrderStatusDesc', !this.orderStatusDesc)
                } else {
                    this.$store.commit('setOrderStatusDesc', !this.orderStatusDesc)
                    this.$store.commit('setOrderStatusActive', false)
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
    },
    watch: {
        checked() {
            this.$store.commit('checkAll', this.checked)
        }
    }
}
</script>


<style src="~/assets/css/components/partials/OverviewListHeader.scss" lang="scss" scoped>
</style>
