import Vuex from 'vuex'

// Modules
import * as directory from '@/store/modules/directory'
import * as user from '@/store/modules/user'
import * as upload from '@/store/modules/upload'
import * as listOrder from '@/store/modules/listOrder'

const Store = () => {
    return new Vuex.Store({
        modules: {
            directory,
            user,
            upload,
            listOrder
        }
    })
}

export default Store
