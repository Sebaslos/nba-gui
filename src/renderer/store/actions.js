import * as types from './mutation-types'

export const decrementMain = ({ commit }) => {
  commit(types.DECREMENT_MAIN_COUNTER)
}

export const incrementMain = ({ commit }) => {
  commit(types.INCREMENT_MAIN_COUNTER)
}

export const updateTable = ({ commit }, data) => {
  commit(types.UPDATE_TABLE, data)
}

export const updateView = ({ commit }, data) => {
  commit(types.UPDATE_VIEW, data)
}