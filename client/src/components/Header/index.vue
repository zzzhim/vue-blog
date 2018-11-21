<template>
    <el-header class="box">
        <el-row>
            <el-col :span="24" >
                <el-menu
                    class="box-NavBar" mode="horizontal"
                    @select="handleSelect"
                    background-color="#333333"
                    text-color="#ffffff"
                    active-text-color="	#409EFF"
                    :default-active="activeIndex"
                >
                    <el-menu-item index="/home" class="box-NavBar-list" @click="$router.push('/')">文章</el-menu-item>
                    <el-menu-item index="/archive" class="box-NavBar-list" @click="$router.push('/archive')">归档</el-menu-item>
                    <el-menu-item index="/tags" class="box-NavBar-list" @click="$router.push('/tags')">标签</el-menu-item>
                    <el-menu-item index="4" class="box-NavBar-list">阅读</el-menu-item>
                    <el-menu-item index="5" class="box-NavBar-list">阅读列表</el-menu-item>
                    <el-menu-item index="6" class="box-NavBar-list">关于我</el-menu-item>
                    <el-menu-item index="/registered" class="box-NavBar-list box-NavBar-item" @click="$router.push('/registered')">注册</el-menu-item>
                    <el-menu-item index="/login" class="box-NavBar-list box-NavBar-item" @click="$router.push('/login')">登录</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>

    export default {
        data() {
            return {
            }
        },
        props: {
            activeIndex: String
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath)
            }
        },

    }
</script>


<style lang="less" scoped>
    .box {
        width: 100%;
        padding: 0px 20px;
        background-color:#333333;

        &-NavBar {
            width: 100%;
            &-item {
                float: right;
            }
        }
    }
</style>
