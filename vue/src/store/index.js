import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import * as directory from '@/store/directory'
import * as user from '@/store/user'
import * as upload from '@/store/upload'
import * as listOrder from '@/store/listOrder'

Vue.use(Vuex)

export default () => {
    return new Vuex.Store({
        modules: {
            directory,
            user,
            upload,
            listOrder
        }
    })
}
