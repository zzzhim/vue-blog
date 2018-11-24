import query from '../uitls/query.js'
import escape from '../uitls/escape'

class ArticleModel {
    // 插入用户数据
    async addArticle(username, password, email) {
        return await query(escape`INSERT INTO clientuser SET username=${username}, password=${password}, email=${email}, avatar='TiFSa-8u-1YI1JzJWMD3D.png'`)
    }
}

export default new ArticleModel()