import query from '../uitls/query.js'
import escape from '../uitls/escape'

class ArticleModel {
    // 查询所有文章
    async getAllArticle() {
        return await query(escape`SELECT * FROM ARTICLE ORDER BY createTime DESC`)
    }

    async addArticle() {
        return await query(escape`INSERT INTO ARTICLE SET title='新文章', tags='', createTime=NOW(), publishTime=NOW(), content=''`)
    }

    async getOneArticle(id) {
        return await query(escape`SELECT * FROM ARTICLE WHERE id=${id}`)
    }

    async updateArticle(id, { title, tags, content, isPublished }) {
        return await query(escape`UPDATE ARTICLE SET title=${title}, tags=${tags},content=${content} WHERE id=${id}`)
    }

    async deleteArticle(id) {
        return await query(escape`DELETE FROM ARTICLE WHERE id=${id}`)
    }

    async publishArticle(id) {
        return await query(escape`UPDATE ARTICLE SET  publishTime=NOW(), isPublished=1 WHERE id=${id}`)
    }

    // 修改标签
    async upDataTag(id, tag) {

        return await query(escape`update ARTICLE set tags=${tag} WHERE id=${id}`)
    }
}

export default new ArticleModel()