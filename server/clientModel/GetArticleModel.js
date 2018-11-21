import query from '../uitls/query.js'
import escape from '../uitls/escape'

class GetArticleModel {
    // 查询所有文章
    async getAllArticle() {
        return await query(escape`SELECT * FROM ARTICLE  WHERE isPublished=${1} ORDER BY createTime DESC`)
    }

    async GetArticles(id) {
        return await query(escape`SELECT * FROM ARTICLE WHERE id=${id}`)
    }

    async GetArchive() {
        return await query(escape`SELECT * FROM ARTICLE WHERE isPublished=${1} ORDER BY publishTime DESC`)
    }

    async GetTags() {
        return await query(escape`SELECT * FROM ARTICLE WHERE isPublished=${1} ORDER BY publishTime DESC`)
    }

}

export default new GetArticleModel()