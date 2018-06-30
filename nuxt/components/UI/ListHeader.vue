<template>
    <div class="list-header">
        <!-- Checkbox -->
        <div class="list-item justify-center"
             style="width: 50px">
            <input type="checkbox"
                   class="checkbox"
                   v-model="checked">
        </div>
        <!-- Type -->
        <div class="list-item justify-start"
             style="width: 100px">
            <div @click="toggleOrderType()">
                <span>{{ $t('partials.ListHeader.type') }}</span>
                <i class="dropdown"
                   :class="[isOrderTypeActive ? (orderTypeDesc ? 'dropdown-shown' :  'dropdown-active dropdown-shown') : '']"></i>
            </div>
        </div>
        <!-- Name -->
        <div class="list-item"
             style="width: calc(100vw - 605px - 50px)">
            <div @click="toggleOrderName()">
                <span>{{ $t('partials.ListHeader.name') }}</span>
                <i class="dropdown"
                   :class="[isOrderNameActive ? (orderNameDesc ? 'dropdown-shown' :  'dropdown-active dropdown-shown') : '']"></i>
            </div>
        </div>
        <!-- Extended Menu -->
        <div class="list-item"
             style="width: 100px">
            <span></span>
        </div>
        <!-- Size -->
        <div class="list-item"
             style="width: 100px">
            <div @click="toggleOrderSize()">
                <span>{{ $t('partials.ListHeader.size') }}</span>
                <i class="dropdown"
                   :class="[isOrderSizeActive ? (orderSizeDesc ? 'dropdown-shown' :  'dropdown-active dropdown-shown') : '']"></i>
            </div>
        </div>
        <!-- Date -->
        <div class="list-item"
             style="width: 100px">
            <div @click="toggleOrderDate()">
                <span>{{ $t('partials.ListHeader.date') }}</span>
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
    },
    watch: {
        checked() {
            this.$store.commit('checkAll', this.checked)
        }
    }
}
</script>


<style src="~/assets/css/components/UI/Row.scss" lang="scss" scoped>
</style>
