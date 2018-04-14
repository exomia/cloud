import Vuex from 'vuex'

// State
import { UserState } from '~/store/state/user'
import { DirectoryState } from '~/store/state/directory'

// Getters
import { UserGetters } from '~/store/getters/user'
import { DirectoryGetters } from '~/store/getters/directory'

// Mutations

// Actions
import { TestActions } from '~/store/actions/test'

const Store = () => {
  return new Vuex.Store({
    // State
    state: { ...UserState, ...DirectoryState },
    // Getters
    getters: { ...UserGetters, ...DirectoryGetters },
    // Mutations
    mutations: {},
    // Actions
    actions: { ...TestActions }
  })
}

export default Store
