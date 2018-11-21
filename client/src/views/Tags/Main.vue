<template>
    <el-main>
        <el-row>
            <el-col :span="16" :offset="4">
                <h1 class="title">标签列表</h1>
                <el-collapse accordion>
                    <el-collapse-item v-for="(item, index) in tags" :key="index" class="collapseItem">
                        <template slot="title">
                            <h3 class="collapseItem-h3">{{ item }}</h3>
                        </template>
                        <div v-for="(tagItem, index) in tag[item]" :key="index" class="collapseItem-title">
                            <router-link :to="`/articles/${tagItem.id}`" tag="span" class="collapseItem-title-span">{{tagItem.title}}</router-link>
                            <router-link :to="`/articles/${tagItem.id}`" tag="time" class="collapseItem-title-time">{{ tagItem.publishTime }}</router-link>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
    import request from '@/utils/request'
    import moment from 'moment'

    export default {
        data() {
            return {
                tags: [],
                tag: {}
            }
        },
        created() {
            request({
                url: '/tags',
                method: 'get'
            }).then(res => {
                //  {id: 292, title: "新文章5", tags: "adas,tag", createTime: "2018-11-20T07:29:18.000Z", publishTime: "2019-11-20T08:03:53.000Z", …}
                for (const iterator of res) {
                    // 把标签分割成数组
                    let tags = iterator.tags.split(',')
                    // 去重
                    for (let index = 0; index < tags.length; index++) {
                        if(!this.tags.includes(tags[index])) {
                            this.tags.push(tags[index])
                            this.tag[tags[index]] = []
                        }
                        iterator.publishTime = moment(iterator.publishTime).format('MM-DD')
                        this.tag[tags[index]].push(iterator)
                    }
                }
            })
        },
    }
</script>

<style lang="less" scoped>
    .title {
        font-size: 26px;
        margin: 10px 0px 20px 0px;
        color: #333333;
        font-weight: bold;
    }
    .collapseItem {
        text-indent: 2em;

        &-h3 {
            color: #333333;
            font-weight: bold;
            &::before {
                content: '#';
                color: #f18f01;
            }
        }

        &-title {
            text-indent: 4em;

            &-span {
                cursor: pointer;
                color: #f18f01;
                font-size: 14px;
                padding-right: 5px;
            }
            &-time {
                color: #c1bfb5;
            }
        }
    }
</style>
