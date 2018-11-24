<template>
    <el-main>
        <el-row>
            <el-col :span="24">
                <el-card class="box-card" shadow="hover" v-for="(item,index) in GetArtiles" :key="index">
                    <div slot="header" class="box-card-header">
                        <router-link :to="`/articles/${item.id}`" class="box-card-header-title" tag="h1" v-html="item.title"></router-link>
                    </div>
                    <div class="box-card-content">
                        <time class="box-card-content-time" v-html="item.publishTime"></time>
                        <div class="box-card-content-title"  v-html="parseMarkdown(item.content)"></div>
                        <router-link tag="footer" :to="`/articles/${item.id}`" class="box-card-content-footer">
                            {{ '... 继续阅读' }}
                        </router-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" >
                    <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        :page-size="5"
                        layout="prev, pager, next, jumper"
                        class="pagination"
                        :total="len">
                    </el-pagination>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
    import request from '@/utils/request'
    import moment from 'moment'
    import parseMarkdown from '@/utils/parseMarkdown'

    export default {
        data() {
            return {
                GetArtiles: null,
                len: 0
            }
        },
        methods: {
            parseMarkdown,
            handleCurrentChange(index) { // 当前页
                this.GetHome(index)
            },
            GetHome(index) {
                request({
                    url: '/home',
                    method: 'get',
                    params: {
                        size: 5,
                        limit: index || 1
                    }
                }).then(res => {
                    const pattern = /<!-- more -->/i
                    for (let article of res.data) {
                        article.publishTime = moment(article.publishTime).format('YYYY年 MM月 DD日 HH:mm:ss')

                        pattern.test(article.content)

                        article.content = RegExp['$`']
                    }
                    this.GetArtiles = res.data
                    this.len = res.len
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        created() {
            this.GetHome()
        }
    }
</script>

<style lang="less">
    .pagination {
        text-align: center;
    }
    .box-card {
        margin-bottom: 14px;
        .el-card__header {
            border-bottom: none;
            padding-bottom: 0px;
        }

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

            &-time {
                display: block;
                margin-bottom: 18px;
                color: #c1bfb5;
                font-weight: 600;
            }

            &-title {
                color: #34495e;
                font-size: 14px;
                margin-bottom: 14px;
            }

            &-footer {
                color: #f18f01;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }
</style>
