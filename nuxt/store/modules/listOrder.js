export const state = () => ({
    orderTypeActive: true,
    orderTypeDesc: true,
    //
    orderNameActive: false,
    orderNameDesc: true,
    //
    orderSizeActive: false,
    orderSizeDesc: true,
    //
    orderDateActive: false,
    orderDateDesc: true
})

export const getters = {
    isOrderTypeActive: state => state.orderTypeActive,
    orderTypeDesc: state => state.orderTypeDesc,
    //
    isOrderNameActive: state => state.orderNameActive,
    orderNameDesc: state => state.orderNameDesc,
    //
    isOrderSizeActive: state => state.orderSizeActive,
    orderSizeDesc: state => state.orderSizeDesc,
    //
    isOrderDateActive: state => state.orderDateActive,
    orderDateDesc: state => state.orderDateDesc
}

export const mutations = {
    sortByActiveMethod(state) {
        let method = undefined
        let desc = undefined
        if (state.orderTypeActive === true) {
            method = 'type'
            desc = state.orderTypeDesc
        } else if (state.orderNameActive === true) {
            method = 'name'
            desc = state.orderNameDesc
        } else if (state.orderSizeActive === true) {
            method = 'size'
            desc = state.orderSizeDesc
        } else if (state.orderDateActive === true) {
            method = 'timestamp'
            desc = state.orderDateDesc
        }
        this.commit('sortByX', { val: method, desc })
    },
    //
    setOrderTypeActive(state, active = true) {
        if (active === true) {
            state.orderNameActive = false
            state.orderSizeActive = false
            state.orderDateActive = false
        }
        state.orderTypeActive = active
    },
    setOrderTypeDesc(state, toggle) {
        state.orderTypeDesc = toggle
        this.commit('sortByActiveMethod')
    },
    //
    setOrderNameActive(state, active = true) {
        if (active === true) {
            state.orderTypeActive = false
            state.orderSizeActive = false
            state.orderDateActive = false
        }
        state.orderNameActive = active
    },
    setOrderNameDesc(state, toggle) {
        state.orderNameDesc = toggle
        this.commit('sortByActiveMethod')
    },
    //
    setOrderSizeActive(state, active = true) {
        if (active === true) {
            state.orderTypeActive = false
            state.orderNameActive = false
            state.orderDateActive = false
        }
        state.orderSizeActive = active
    },
    setOrderSizeDesc(state, toggle) {
        state.orderSizeDesc = toggle
        this.commit('sortByActiveMethod')
    },
    //
    setOrderDateActive(state, active = true) {
        if (active === true) {
            state.orderTypeActive = false
            state.orderSizeActive = false
            state.orderNameActive = false
        }
        state.orderDateActive = active
    },
    setOrderDateDesc(state, toggle) {
        state.orderDateDesc = toggle
        this.commit('sortByActiveMethod')
    }
}
