import GetArticleModel from '../clientModel/GetArticleModel'

class GetArticle {
    // 首页
    async GetHome(ctx) {
        const { size, limit } = ctx.request.query
        
        const len = (await GetArticleModel.Getlens()).length
        const res = await GetArticleModel.getAllArticle((size * limit - size), (size * limit))

        ctx.body = {
            data: res,
            len
        }
        
    }
    // 文章详情
    async GetArticles(ctx) {
        const { id } = ctx.request.query

        const res = (await GetArticleModel.GetArticles(id))[0]
        ctx.body = res
    }
    // 归档
    async GetArchive(ctx) {
        const res = await GetArticleModel.GetArchive()
        
        ctx.body = res
    }
    // 标签
    async GetTags(ctx) {
        const res = await GetArticleModel.GetTags()

        ctx.body = res
    }
    // 阅读列表
    async GetReadList(ctx) {
        const res = await GetArticleModel.GetReadList()

        ctx.body = res
    }

    async GetAbout(ctx) {
        const res = await GetArticleModel.GetAbout()

        ctx.body = res
    }
}

export default new GetArticle()