<template>
    <div>
        <template>
            <el-table
                :data="tableData2"
                style="width: 100%;margin-top:1em;"
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
                            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                        >
                        </el-rate>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                >
                    <template slot-scope="scope">
                        <button class="not-botton" @click="show(scope.row)">编辑</button>
                        <button class="not-botton del-botton" @click="onDel(scope.row)">删除</button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="Indexs"
                :page-size="5"
                :current-page="ActiveIndex"
                @current-change="onChange"
                class="pagination"
            >
            </el-pagination>
        </template>
        <modal
            name="hello-world"
            :resizable="true"
            :draggable="true"
            :reset="true"
            width="400px"
            height="245px"
            class="modal"
            >
            <input type="text" class="modal-input" placeholder="请填写书籍名称" v-model="modal.name">
            <input type="text" class="modal-input" placeholder="请填写作者名称" v-model="modal.author">
                <el-rate
                    class="block"
                    v-model="modal.score"
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
            <div class="modal-button">
                <button @click="subForm">提交</button>
                <button @click="hide">取消</button>
            </div>
        </modal>
        <modal
            name="title"
            width="400px"
            height="150px"
            class="title"
        >   
            <div class="title-title">此操作为不可逆操作,是否继续进行？</div>
            <div class="title-button">
                <button @click="delForm">提交</button>
                <button @click="$modal.hide('title')">取消</button>
            </div>
        </modal>
        <notifications group="user"></notifications>
    </div>
</template>

<script>
    import request from '@/utils/request'
    import { mapMutations, mapState   } from 'vuex'

    export default {
        data() {
            return {
                Indexs: 0,
                ActiveIndex: 1,
                delIndex: null,
                tableData2: [
                    {
                        name: '',
                        author: '',
                        score: null,
                        id: 0
                    }
                ],
                modal: {
                    name: '',
                    author: '',
                    score: 1,
                    id: 0
                }
            }
        },
        computed: {
            ...mapState(['readList']),
        },
        methods: {
            ...mapMutations(['SET_READLIST']),
            show (data) {
                this.modal.name = data.name
                this.modal.author = data.author
                this.modal.score = data.score
                this.modal.id = data.id

                this.SET_READLIST('/updateReadList')
                this.$modal.show('hello-world')
            },
            hide () {
                this.$modal.hide('hello-world');
            },
            subForm() {
                if(this.modal.name != '' && this.modal.author != '') {
                    request({
                        url: this.readList,
                        method: 'put',
                        data: this.modal
                    }).then(res => {
                        if(res.success) {
                            this.$notify({
                                type: 'warn',
                                group: 'user',
                                title: '成功',
                                text: res.message
                            })
                            this.hide()
                            this.getBookList()
                        }
                    }).catch(err => {
                        console.log(err);
                        this.hide()
                    })
                }else {
                    this.$notify({
                        type: 'error',
                        group: 'user',
                        title: '失败',
                        text: '书籍名称and作者名称不能为空'
                    })
                }

            },
            onDel({id}) {
                this.delIndex = id
                this.$modal.show('title')
            },
            delForm() {
                request({
                    url: 'delReadList',
                    method: 'delete',
                    params: {
                        id : this.delIndex
                    }
                }).then(res => {
                    if(res.success) {
                        this.$notify({
                            type: 'warn',
                            group: 'user',
                            title: '成功',
                            text: res.message
                        })
                        this.$modal.hide('title');
                        this.getBookList()
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            getBookList() {
                request({
                    url: 'getReadList',
                    method: 'get',
                    params: {
                        size: 5,
                        limit: this.ActiveIndex
                    }
                }).then(res => {
                    this.tableData2 = res.data
                    this.Indexs = res.len
                }).catch(err => {
                    console.log(err);
                })
            },
            onChange(index) {
                this.ActiveIndex = index
                this.getBookList()
            }
        },
        created() {
            this.getBookList()
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/style/variable.scss';

    .not-botton {
        color: #fefdff;
        background: #f18f01;
        border: 1px solid #f18f01;
        cursor: pointer;

        &:focus {
            outline: none;
        }
    }
    .del-botton {
        background: #ccc;
        border: 1px solid #ccc;
    }
    .pagination {
        margin-top: 20px;
        @include flex;
    }
    .modal {

        &-input {
            width: 80%;
            height: 40px;
            display: block;
            text-indent: 1em;
            margin: 20px auto;
            border: 1px solid #ddd;
            border-radius: 5px;
            &:focus {
                outline: none;
            }
        }
        .block {
            @include flex;
        }
        &-button {
            @include flex;

            button {
                border: none;
                color: #fefdff;
                background: #f18f01;
                margin: 20px 5px;
                padding: 5px 10px;
                cursor: pointer;
                &:last-child {
                    background: #ccc;
                }
            }
        }
    }
    .title {

        &-title {
            @include flex;
            font-size: 20px;
            position: absolute;
            top: 40%;
            left: 5%;
            transform: translate(0%,-50%);
        }
        &-button {
            position: absolute;
            right: 10px;
            bottom: 0px;
            button {
                border: none;
                color: #fefdff;
                background: #f18f01;
                margin: 20px 5px;
                padding: 5px 10px;
                cursor: pointer;
                &:last-child {
                    background: #ccc;
                }
            }
        }
    }

</style>
