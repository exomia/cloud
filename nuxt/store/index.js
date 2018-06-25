import Vuex from 'vuex'

// Modules
import * as auth from '@/store/modules/auth'
import * as directory from '@/store/modules/directory'
import * as user from '@/store/modules/user'
import * as fileExchange from '@/store/modules/fileExchange'
import * as listOrder from '@/store/modules/listOrder'

const Store = () => {
    return new Vuex.Store({
        modules: {
            auth,
            directory,
            user,
            fileExchange,
            listOrder
        }
    })
}

export default Store
