import Article from '../model/ArticleModel'
import About from '../model/AboutModel'

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
        ctx.body = res
    }

    async updateArticle(ctx) {
        const id = ctx.params.id
        const res = await Article.updateArticle(id, ctx.request.body)
        ctx.body = res
    }

    async deleteArticle(ctx) {
        const id = ctx.params.id
        const res = await Article.deleteArticle(id)
        ctx.body = res
    }

    async publishArticle(ctx) {
        const id = ctx.params.id
        const res = await Article.publishArticle(id)
        ctx.body = res
    }
    // 关于我
    async UpdateAbout(ctx) {
        const { data } = ctx.request.body
        
        await About.updateAbout(data)

        ctx.body = {
            success: true,
        }
    }
    
    async GetAbout(ctx) {
        const res = await About.GetAbout()
        ctx.body = res
    }
}

export default new ArticleController()