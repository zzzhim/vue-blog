<template>
    <div>
        <ul class="list">

            <li class="article"  :class="{active: activeIndex === index, published: isPublished === 1}" v-for="{title, createTime,isPublished, isChosen},index in articleList" @click="select(index)">
                <header>{{ title }}</header>
                <p>{{ createTime }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import request from '@/utils/request'
    import moment from 'moment'
    import { mapState, mapMutations } from 'vuex'

    export default {
        name: "ArticleList",
        data() {
            return {
                articleList: [],
                activeIndex: -1
            }
        },
        // 把全局的vuex里面的state和mutations放到计算属性中
        computed: {
            ...mapState(['id', 'title', 'tags', 'content', 'isPublished', 'toggleDelete', 'resDatas']),
        },
        methods: {
            updateList(updateId) {
                request({
                    method: 'get',
                    url: `/articles/${updateId}`
                }).then(res => {
                    let article = res[0]

                    article.createTime = moment(article.createTime).format('YYYY年--MM月--DD日 HH:mm:ss')
                    article.isChosen = true
                    this.articleList.unshift(article)
                    // 如果发布了新文章的话,当前被选中的文章的index+1
                    this.activeIndex++
                }).catch(err => {
                    console.log(err)
                })
            },
            select(index) {
                this.activeIndex = index
                // 当你在选择文章的时候,当前被选中的文章扔到全局管理中去
                this.SET_CURRENT_ARTICLE(this.articleList[index])
            },
            query() {
                request({
                    method: 'get',
                    url: '/articles'
                }).then(res => {
                    this.SET_RESDATA(res)
                    for(let article of res) {
                        article.createTime = moment(article.createTime).format('YYYY年--MM月--DD日 HH:mm:ss')
                        article.isChosen = true
                    }
                    this.articleList = res
                    if(this.articleList.length !== 0) {
                        this.SET_CURRENT_ARTICLE(this.articleList[0])
                        this.activeIndex = 0
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            ...mapMutations(['SET_CURRENT_ARTICLE', 'SET_RESDATA']),
        },
        // 当该组件创建的时候自动执行里面的请求
        created() {
            this.query()
        },
        // 监听vuex数据
        watch:{
            title(val) {
                if(this.articleList.length !== 0) {
                    this.articleList[this.activeIndex].title = val
                }
            },
            tags(val) {
                if(this.articleList.length !== 0) {
                    this.articleList[this.activeIndex].tags = val
                }
            },
            content(val) {
                if(this.articleList.length !== 0) {
                    this.articleList[this.activeIndex].isPublished = val
                }
            },
            toggleDelete(val) {
                // 如果这个值有变化,从false变成true,说明当前文章是需要删除的
                this.articleList.splice(this.activeIndex, 1)
                if(this.activeIndex === this.articleList.length) {
                    this.activeIndex--
                }

                if(this.articleList.length !== 0) {
                    this.SET_CURRENT_ARTICLE(this.articleList[this.activeIndex])
                }else {
                    this.SET_CURRENT_ARTICLE({
                        id: '',
                        title: '',
                        tags: '',
                        content: '',
                        isPublished: ''
                    })
                }
            },
            resDatas(val) {
                this.articleList = val
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../assets/style/variable.scss';

.article {
    @include flex($flow: column wrap, $align: flex-start);
    padding: 0.2em 0.5em;
    margin-bottom: 1.5em;
    height: 5em;
    max-width: 100%;
    background: $white;
    border: 0.1em solid $special;
    cursor: pointer;
    header {
        max-width: 100%;
        font-size: 1.3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.2em;
    }
    p {
        margin: 0;
        color: $special;
    }
    &:last-child {
        margin-bottom: 0;
    }
}

.active {
    border: 1px solid $base;
}

.published {
    border-right: 4px solid $base;
}

</style>