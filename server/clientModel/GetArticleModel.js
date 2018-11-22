import query from '../uitls/query.js'
import escape from '../uitls/escape'

class GetArticleModel {
    // 查询所有文章
    async getAllArticle() {
        return await query(escape`SELECT * FROM ARTICLE  WHERE isPublished=${1} ORDER BY createTime DESC`)
    }
    // 文章详情
    async GetArticles(id) {
        return await query(escape`SELECT * FROM ARTICLE WHERE id=${id}`)
    }
    // 归档
    async GetArchive() {
        return await query(escape`SELECT * FROM ARTICLE WHERE isPublished=${1} ORDER BY publishTime DESC`)
    }
    // 标签
    async GetTags() {
        return await query(escape`SELECT * FROM ARTICLE WHERE isPublished=${1} ORDER BY publishTime DESC`)
    }
    // 阅读列表
    async GetReadList() {
        return await query(escape`SELECT * FROM rd_list ORDER BY id DESC`)
    }
    // 关于我
    async GetAbout() {
        return await query(escape`SELECT * FROM about`)
    }
}

export default new GetArticleModel()