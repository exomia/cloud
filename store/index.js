import Vuex from 'vuex'

// State
import { UserState } from '~/store/state/user'
import { ProjectState } from '~/store/state/project'

// Getters

// Mutations
import { ProjectMutation } from '~/store/mutations/project'

// Actions
import { ProjectAction } from '~/store/actions/project'

const Store = () => {
  return new Vuex.Store({
    // State
    state: { ...UserState, ...ProjectState },
    // Getters
    getters: {},
    // Mutations
    mutations: { ...ProjectMutation },
    // Actions
    actions: { ...ProjectAction }
  })
}
