<template>
    <el-container direction="vertical">
        <v-header :activeIndex="activeIndex"></v-header>
        <el-main>
            <el-row>
                <el-col :span="16" :offset="4">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <h1 class="box-card-header-title" v-html="Article.title"></h1>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="$router.back(-1)">返回文章列表</el-button>
                        </div>
                        <article class="box-card-content">
                                <time v-html="Article.publishTime" class="box-card-content-time"></time>
                                <h4 class="box-card-content-tags">
                                    <span v-for="item,index in Article.tags" :key="index" v-html="item"></span>
                                </h4>
                                <p class="box-card-content-article" v-html="parseMarkdown(Article.content)"></p>
                        </article>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import Header from '@/components/Header'
    import request from '@/utils/request'
    import moment from 'moment'
    import parseMarkdown from '@/utils/parseMarkdown'

    export default {
        name: 'home',
        data() {
            return {
                activeIndex: "/home",
                Article: {
                    tags: [],
                    publishTime: '',
                    content: '',
                    title: ''
                }
            }
        },
        components: {
            'v-header': Header
        },
        props: ['id'],
        methods: {
            parseMarkdown
        },
        created() {
            request({
                url: '/articles',
                method: 'get',
                params: {
                    id: this.id
                }
            }).then(res => {
                res.publishTime = moment(res.publishTime).format('YYYY年 MM月 DD日 HH:mm:ss')
                res.tags = res.tags != "" ? res.tags.split(',') : []
                this.Article = res
            }).catch(err => {
                console.log(err);
            })
        },
    }
</script>

<style lang="less" scoped>
    .box-card {

        &-header {
            &-title {
                cursor: pointer;
                font-size: 22px;
                font-weight: bold;
                line-height: 1;
                display: inline-block;
                position: relative;
                &::after {
                    content: '';
                    display: block;
                    width: 0%;
                    height: 10%;
                    background: #f18f01;
                    transition: width 1s;
                    position: absolute;
                    margin-top: 5%;
                }
                &:hover::after {
                    width: 100%;
                }
            }
        }

        &-content {
            &-tags {
                margin-bottom: 14px;

                span {
                    display: inline-block;
                    margin-right: 5px;
                    color: #f18f01;
                    cursor: pointer;
                    position: relative;
                    &::after {
                        content: '';
                        display: block;
                        width: 0%;
                        height: 10%;
                        background: #f18f01;
                        transition: width 1s;
                        position: absolute;
                        margin-top: 5%;
                    }
                    &:hover::after {
                        width: 100%;
                    }
                }
            }
            
            &-time {
                display: block;
                margin-bottom: 18px;
                color: #c1bfb5;
                font-weight: 600;
            }

            &-article {
                color: #34495e;
                font-size: 14px;
                margin-bottom: 14px;
                background-color: #ecebe4;
                padding: 5px 10px;
            }
        }
    }
</style>
