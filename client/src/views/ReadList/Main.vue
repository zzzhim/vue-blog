<template>
    <el-main>
        <el-row>
            <el-col :span="16" :offset="4">
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
                >
                    <el-table-column
                        prop="name"
                        label="书名"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="author"
                        label="作者"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="score"
                        label="评分"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-rate
                                v-model="scope.row.score"
                                disabled
                                show-score
                                :score-template="`${scope.row.score}`"
                                text-color="#ff9900"
                            >
                            </el-rate>
                        </template>

                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
    import request from '@/utils/request'

    export default {
        data() {
            return {
                tableData: [
                    {
                        name: '2016-05-02',
                        author: '王小虎',
                        score: 3.7
                    }
                ]
            }
        },
        created() {
            request({
                url: '/readList',
                method: 'get'
            }).then(res => {
                this.tableData = res
            }).catch(err => {
                console.log(err);
            })
        },
    }
</script>

<style lang="less" scoped>

</style>
