<template>
    <el-header class="boxHeader">
        <el-row>
            <el-col :span="24" >
                <el-menu
                    class="boxHeader-NavBar" mode="horizontal"
                    @select="handleSelect"
                    background-color="#333333"
                    text-color="#ffffff"
                    active-text-color="#409EFF"
                    :default-active="$route.path"
                >
                    <el-menu-item index="/home" class="boxHeader-NavBar-list">文章</el-menu-item>
                    <el-menu-item index="/archive" class="boxHeader-NavBar-list">归档</el-menu-item>
                    <el-menu-item index="/tags" class="boxHeader-NavBar-list">标签</el-menu-item>
                    <el-menu-item index="/readList" class="boxHeader-NavBar-list">阅读列表</el-menu-item>
                    <el-menu-item index="/about" class="boxHeader-NavBar-list">关于我</el-menu-item>
                    <el-menu-item index="/registered" class="boxHeader-NavBar-list boxHeader-NavBar-item">注册</el-menu-item>
                    <template v-if="status">
                        <el-submenu index="2" class="boxHeader-NavBar-list boxHeader-NavBar-item">
                            <template slot="title">
                                <div>
                                    <img :src="'http://localhost:4000/' + ImgPath" alt="" class="ImgPath">
                                    {{username}}
                                </div>
                            </template>
                                <el-menu-item index="2-1" @click="onUpAvatar">上传头像</el-menu-item>
                                <el-menu-item index="2-2" @click="onClick">退出登录</el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item index="/login" class="boxHeader-NavBar-list boxHeader-NavBar-item">登录</el-menu-item>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
        <el-dialog
            title="上传图片"
            :visible.sync="centerDialogVisible"
            width="40%"
            center>
            <v-model-box></v-model-box>
                <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>
    </el-header>
</template>

<script>
    import { getToken, removeToken, removeusername, getusername } from '@/utils/auth'
    import ModalBox from './MessageBox.vue'
    import { mapState, mapMutations } from 'vuex'
    import request from '@/utils/request'

    export default {
        data() {
            return {
                status: false,
                centerDialogVisible: false,
            }
        },
        computed: {
            ...mapState(['ImgPath'])
        },
        methods: {
            ...mapMutations(['SET_IMGPATH']),
            handleSelect(key, keyPath) {
                // 路由名单
                const RouterList = ['/home', '/archive', '/tags', '/readList', '/about', '/registered', '/login']
                if(RouterList.includes(key)) {
                    this.$router.push(key)
                }
            },
            onUpAvatar() {
                this.centerDialogVisible = true
            },
            onClick() {
                removeToken()
                removeusername()
                this.status = false
            },
        },
        created() {
            if(getToken()) {
                this.username = getusername()
                this.status = true
                request({
                    url: '/getUrlPath',
                    params: {
                        username: this.username 
                    }
                }).then(res => {
                    if(res.success) {
                        this.SET_IMGPATH(res.ImgUrl)
                    }
                })
            }else {
                this.status = false
            }

        },
        components: {
            'v-model-box': ModalBox
        }

    }
</script>

<style lang="less">
    .ImgPath {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .boxHeader {
        width: 100%;
        padding: 0px 20px;
        background-color:#333333;

        &-NavBar {
            width: 100%;
            &-item {
                float: right !important;
            }
        }
    }
    .el-menu--horizontal {
        background-color:#333333 !important;
        .el-menu {
            margin-top: 0px !important;
        }
    }
</style>
