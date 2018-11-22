<template>
    <el-main>
        <el-row>
            <el-col :span="16" :offset="4">
                <h1 class="title">关于我</h1>
                <article v-html="parseMarkdown(data.content)"></article>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
    import request from '@/utils/request'
    import parseMarkdown from '@/utils/parseMarkdown'

    export default {
        data() {
            return {
                data: {
                    content: ''
                }
            }
        },
        methods: {
            parseMarkdown
        },
        created() {
            request({
                url: '/about',
                method: 'get'
            }).then(res => {
                this.data = res[0]
            }).catch(err => {
                console.log(err);
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


</style>
