import query from '../uitls/query.js'

class ArticleModel {
    // 查询所有文章
    async getAllArticle() {
        return await query("SELECT * FROM ARTICLE ORDER BY createTime DESC")
    }
}

export default new ArticleModel()