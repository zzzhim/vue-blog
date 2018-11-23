const getters = {
    getTags: state => {
        if(state.tags.length !== 0 && typeof state.tags == 'string') {
            // 把tags字符串切成数组返回
            return state.tags.split(',')
        }
        return []
    }
}
export default getters
