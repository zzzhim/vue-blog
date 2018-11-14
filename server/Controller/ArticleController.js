import Article from '../model/ArticleModel'

class ArticleController {
    async getArticles(ctx, next) {
        const data = await Article.getAllArticle()
        ctx.body = data
    }
}

export default new ArticleController()