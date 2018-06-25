export const state = () => ({
    orderNameActive: false,
    orderNameDesc: true,
    //
    orderStatusActive: false,
    orderStatusDesc: true,
    //
    orderSizeActive: false,
    orderSizeDesc: true,
    //
    orderDateActive: false,
    orderDateDesc: true
})

export const getters = {
    isOrderNameActive: state => state.orderNameActive,
    orderNameDesc: state => state.orderNameDesc,
    //
    isOrderStatusActive: state => state.orderStatusActive,
    orderStatusDesc: state => state.orderStatusDesc,
    //
    isOrderSizeActive: state => state.orderSizeActive,
    orderSizeDesc: state => state.orderSizeDesc,
    //
    isOrderDateActive: state => state.orderDateActive,
    orderDateDesc: state => state.orderDateDesc
}

export const mutations = {
    setOrderNameActive(state, active = true) {
        if (active === true) {
            state.orderStatusActive = false
            state.orderSizeActive = false
            state.orderDateActive = false
        }
        state.orderNameActive = active
    },
    setOrderNameDesc(state, toggle) {
        state.orderNameDesc = toggle
        this.commit('sortByX', { val: 'name', desc: toggle })
    },
    //
    setOrderStatusActive(state, active = true) {
        if (active === true) {
            state.orderNameActive = false
            state.orderSizeActive = false
            state.orderDateActive = false
        }
        state.orderStatusActive = active
    },
    setOrderStatusDesc(state, toggle) {
        state.orderStatusDesc = toggle
        this.commit('sortByX', { val: 'clamav_status', desc: toggle })
    },
    //
    setOrderSizeActive(state, active = true) {
        if (active === true) {
            state.orderStatusActive = false
            state.orderNameActive = false
            state.orderDateActive = false
        }
        state.orderSizeActive = active
    },
    setOrderSizeDesc(state, toggle) {
        state.orderSizeDesc = toggle
        this.commit('sortByX', { val: 'size', desc: toggle })
    },
    //
    setOrderDateActive(state, active = true) {
        if (active === true) {
            state.orderStatusActive = false
            state.orderSizeActive = false
            state.orderNameActive = false
        }
        state.orderDateActive = active
    },
    setOrderDateDesc(state, toggle) {
        state.orderDateDesc = toggle
        this.commit('sortByX', { val: 'timestamp', desc: toggle })
    }
}
