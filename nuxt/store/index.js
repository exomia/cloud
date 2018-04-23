import Vuex from 'vuex'

// State
import { UserState } from '~/store/state/user'
import { DirectoryState } from '~/store/state/directory'

// Getters
import { UserGetters } from '~/store/getters/user'
import { DirectoryGetters } from '~/store/getters/directory'

// Mutations
import { UserMutations } from '~/store/mutations/user'

// Actions
import { AuthActions } from '~/store/actions/auth'

const Store = () => {
    return new Vuex.Store({
        state: { ...UserState, ...DirectoryState },
        getters: { ...UserGetters, ...DirectoryGetters },
        mutations: { ...UserMutations },
        actions: { ...AuthActions }
    })
}

export default Store
