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
                                已登录
                            </template>
                                <el-menu-item index="2-1">上传头像</el-menu-item>
                                <el-menu-item index="2-2" @click="onClick">退出登录</el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item index="/login" class="boxHeader-NavBar-list boxHeader-NavBar-item">登录</el-menu-item>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
    import { getToken, removeToken } from '@/utils/auth'

    export default {
        data() {
            return {
                status: false
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                // 路由名单
                const RouterList = ['/home', '/archive', '/tags', '/readList', '/about', '/registered', '/login']
                if(RouterList.includes(key)) {
                    this.$router.push(key)
                }
            },
            onClick() {
                removeToken()
                this.status = false
            }
        },
        created() {
            if(getToken()) {
                this.status = true
            }else {
                this.status = false
            }
        },

    }
</script>


<style lang="less">
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
