<template>
    <div style="height:100%">
        <head-nav></head-nav>
        <aside-a></aside-a>
        <div class="list-container main">
            <h2>
                标签筛选 / 
                <span>CHOOSE BY TAG</span>
            </h2>
            <hr>
            <main>
                <div class="article-list">
                    <section class="article-list-container">
                        <h3>标签</h3>
                        <button :class="'article-list-container-button ' + (activeTags.includes(item) ? 'article-list-container-button-active' : '')" @click="onPush(item)" v-for="(item, index) in tags" :key="index" v-html="item">{{ item }}</button>

                        <div class="article-list-container-update" v-show="activeTags.length !== 0">
                            <h3>修改标签</h3>
                            <div class="article-list-container-update-input" v-for="(item, index) in activeTags" :key="index" v-show="activeTags.includes(item)">
                                <input type="text" v-model="activeTags[index]" @keydown.enter="onUpDataTag(index)">
                                <sup @click="onDelete(index)">x</sup>
                            </div>
                        </div>
                    </section>
                    <!-- 文章列表的组件 -->
                    <article-list ref="articleList"></article-list>
                </div>
                <!-- 编辑器的组件 -->
                <editor></editor>
            </main>
        </div>
    </div>
</template>

<script>
    import ArticleList from '../common/ArticleList.vue'
    import Editor from '../common/Editor.vue'
    import Aside from '../common/Aside.vue'
    import HeadNav from '../common/HeadNav.vue'
    import request from '@/utils/request'

    import { mapState, mapMutations } from 'vuex'

    export default {
        name: 'List',
        data() {
            return {
                tags: [],
                activeTags: [],
                RexTags: [],
                resDatas: [],
            }
        },
        computed: {
            ...mapState(['resData']),
        },
        methods: {
            ...mapMutations(['SET_RESDATAS']),
            // 点击后 修改标签隐藏显示
            onPush(item) {
                let index = this.activeTags.indexOf(item)
                if(index === -1) {
                    this.activeTags.push(item)
                    this.RexTags.push(item)
                }else {
                    this.activeTags.splice(index, 1)
                    this.RexTags.splice(index, 1)
                }
            },
            // 修改标签
            onUpDataTag(index) {
                if(this.activeTags[index] !== this.RexTags[index]) {
                    request({
                        url: '/upDataTag',
                        method: 'put',
                        data: {
                            newVal: this.activeTags[index],
                            oldVal: this.RexTags[index]
                        }
                    }).then(res => {
                        this.$refs.articleList.query()
                    }).catch(error => {
                        console.log(error);
                    })
                }
            },
            // 删除标签
            onDelete(index) {
                request({
                    url: '/dataDelete',
                    method: 'delete',
                    params: {
                        oldVal: this.RexTags[index],
                    }
                }).then(res => {
                    this.$refs.articleList.query()
                }).catch(error => {
                    console.log(error);
                })
            }
        },
        created() {
        },
        watch: {
            resData(newVal, oldVal) {
                this.tags = []
                let resData = this.resData
                // 遍历
                for(let obj of resData ) {
                    
                    if(obj.tags != '') {
                        // 分割
                        obj.tags = obj.tags.split(',')
                        // 去重
                        for(let index=0; index < obj.tags.length; index++) {
                            // 是否包含
                            if(!this.tags.includes(obj.tags[index])) {
                                this.tags.push(obj.tags[index])
                            }
                        }
                    }
                }
            },
            activeTags(newVal, oldVal) {
                let resData = this.resData
                let resDatas = []
                for (let obj of resData) {
                    if(obj.tags != '') {
                        // 去重
                        for(let index = 0; index < obj.tags.length; index++) {
                            // 是否包含
                            if(newVal.includes(obj.tags[index])) {
                                if(!resDatas.includes(obj)) {
                                    resDatas.push(obj)
                                }
                            }
                        }
                    }
                }
                this.SET_RESDATAS(resDatas)
            }
        },
        components: {
            'article-list': ArticleList,
            'editor': Editor,
            'aside-a': Aside,
            'head-nav': HeadNav
        }
    }
</script>

<style lang="scss" scoped>
@import '../../assets/style/variable.scss';

main {
    @include flex($justify: space-between);
    height: calc(100% - 48px);
    padding: 0.5em 0;
}

.article-list {
    width: 40%;
    height: 100%;
    overflow: auto;
    padding: 0 0.8em 0.5em 0;
    .list {
        // margin: 0;
        padding: 0;
        list-style: none;
    }
}

.editor {
    width: 58%;
    height: 100%;
    padding: 0 0.8em 0.5em 0;
    overflow: auto;
}

.article-list-container{

    &-button {


        margin: 0 1em 1em 0;
        padding: 0.3em;
        color: #f18f01;
        border-radius: 2px;
        border: 1px solid #f18f01;
        background: transparent;
        cursor: pointer;

        &:focus {
            outline: none;
        }
    }
    &-button-active {
        color: #ffffff;
        background: #f18f01;
    }

    &-update {

        &-input {
            width: 100px;
            display: inline-block;
            margin-right: 10px;

            input {
                margin-bottom: 5px;
                width: 80px;
                background: none;
                border: none;
                border-bottom: 1px solid #c1bfb5;
                outline: none;
                color: #34495e;
            }
            sup {
                display: none;
            }

            &:hover  sup {
                display: inline-block;
                cursor: pointer;
                background: #c1bfb5;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                line-height: 8px;
                text-align: center;
            }
        }
    }
}
</style>
