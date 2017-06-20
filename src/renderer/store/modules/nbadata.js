import * as types from '../mutation-types'

const state = {
    sectionTitle: 'title',
    tableData: {}
}

const mutations = {
    [types.UPDATE_TABLE] (state, data) {
        state.sectionTitle = data.sectionTitle;
        state.tableData = data.tableData;
    }
}

export default {
    state,
    mutations
}
