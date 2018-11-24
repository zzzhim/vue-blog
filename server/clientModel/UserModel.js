import query from '../uitls/query.js'

class CilentUserModel {
    // 封装一个查询语句
    async getUserByName(user) {
        return await query(`SELECT * FROM clientuser WHERE username='${user}'`)
    }

    async updateAvatar(name, username) {
        return await query(`UPDATE clientuser SET avatar='${name}' WHERE username=${username}`)
    }
}

export default new CilentUserModel()