import query from '../uitls/query.js'

class UserModel {
    // 封装一个查询语句
    async getUserByName(user) {
        return await query(`SELECT * FROM USER WHERE USER='${user}'`)
    }
}

export default new UserModel()