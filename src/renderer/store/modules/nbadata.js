import * as types from '../mutation-types'

const state = {
  sectionTitle: 'Shot Zone',
  endpoint: 'shotzone',
  tableData: {}
}

const mutations = {
  [types.UPDATE_TABLE] (state, data) {
    state.sectionTitle = data.sectionTitle;
    state.tableData = data.tableData;
  },
  [types.UPDATE_VIEW] (state, data) {
    state.sectionTitle = data.sectionTitle;
    state.endpoint = data.endpoint;
  }
}

export default {
  state,
  mutations
}
