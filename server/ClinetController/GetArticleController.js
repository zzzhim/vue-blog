import GetArticleModel from '../clientModel/GetArticleModel'

class GetArticle {
    async GetHome(ctx) {
        const res = await GetArticleModel.getAllArticle()
        ctx.body = res
    }

    async GetArticles(ctx) {
        const { id } = ctx.request.query

        const res = (await GetArticleModel.GetArticles(id))[0]
        ctx.body = res
    }

    async GetArchive(ctx) {
        const res = await GetArticleModel.GetArchive()
        
        ctx.body = res
    }

    async GetTags(ctx) {
        const res = await GetArticleModel.GetTags()

        ctx.body = res
    }
}

export default new GetArticle()