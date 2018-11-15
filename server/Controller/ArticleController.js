import Article from '../model/ArticleModel'

class ArticleController {
    async getArticles(ctx, next) {
        const data = await Article.getAllArticle()
        ctx.body = data
    }

    async addArticle(ctx, next) {
        const res = await Article.addArticle()

        ctx.body = res
    }

    async getOneArticle(ctx, next) {
        const res = await Article.getOneArticle(ctx.params.id)
        console.log(res);
        
        ctx.body = res
    }
}

export default new ArticleController()