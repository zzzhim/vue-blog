const mutations = {
    // 全局的方法
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERNAME: (state, name) => {
        state.username = name
    }
}

export default mutations