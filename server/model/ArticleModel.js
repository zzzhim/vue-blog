import query from '../uitls/query.js'

class ArticleModel {
    // 查询所有文章
    async getAllArticle() {
        return await query(`SELECT * FROM ARTICLE ORDER BY createTime DESC`)
    }

    async addArticle() {
        return await query(`INSERT INTO ARTICLE SET title='新文章', tags='', createTime=NOW(), publishTime=NOW(), content=''`)
    }

    async getOneArticle(id) {
        return await query(`SELECT * FROM ARTICLE WHERE id=${id}`)
    }
}

export default new ArticleModel()