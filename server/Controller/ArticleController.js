import Article from '../model/ArticleModel'
import About from '../model/AboutModel'
import RdList from '../model/RdListModel'

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

    // 获取书籍列表
    async getReadList(ctx) {
        let { size, limit } = ctx.request.query
        
        size = parseInt(size)
        limit = parseInt(limit)

        try {
            const len = (await RdList.getReadList()).length
            const res = await RdList.getReadListLimit((size * limit - size), (size * limit))

            ctx.body = {
                data: res,
                len
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    // 修改阅读书籍
    async updateReadList(ctx) {
        const { author, name, score, id } = ctx.request.body
        
        await RdList.updateReadList(author, name, score, id)

        ctx.body = {
            success: true,
            message: '修改成功'
        }
    }

    async addBooks(ctx) {
        const { author, name, score } = ctx.request.body

        try {
            await RdList.addBooks(author, name, score)
            ctx.body = {
                success: true,
                message: '增加新书籍成功'
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 删除书籍
    async delReadList(ctx) {
        const { id }  = ctx.request.query

        try {
            await RdList.delReadList(parseInt(id))

            ctx.body = {
                success: true,
                message: '删除书籍成功'
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 修改标签
    async upDataTag(ctx) {
        let { newVal, oldVal } = ctx.request.body

        try {
            const res = await Article.getAllArticle()

            for (let iterator of res) {
                iterator.tags = iterator.tags.split(',')
                let index = iterator.tags.indexOf(oldVal)
                if(index !== -1) {
                    iterator.tags[index] = newVal
                    let tag = iterator.tags.join(',')
                    await Article.upDataTag(iterator.id, tag)
                }
            }
            ctx.body = {
                success: true
            }
        } catch (error) {
            console.log(error);
        }
    }

    async dataDelete(ctx) {
        console.log(111);
        
        const { oldVal } = ctx.request.query

        try {
            const res = await Article.getAllArticle()

            for (let iterator of res) {
                iterator.tags = iterator.tags.split(',')
                let index = iterator.tags.indexOf(oldVal)
                if (index !== -1) {
                    await Article.deleteArticle(iterator.id)
                }
            }
            ctx.body = {
                success: true
            }
        } catch (error) {
            console.log(error);
        }

    }
}

export default new ArticleController()