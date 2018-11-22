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
                    <el-menu-item index="/home" class="box-NavBar-list">文章</el-menu-item>
                    <el-menu-item index="/archive" class="box-NavBar-list">归档</el-menu-item>
                    <el-menu-item index="/tags" class="box-NavBar-list">标签</el-menu-item>
                    <el-menu-item index="/readList" class="box-NavBar-list">阅读列表</el-menu-item>
                    <el-menu-item index="/about" class="box-NavBar-list">关于我</el-menu-item>
                    <el-menu-item index="/registered" class="box-NavBar-list box-NavBar-item">注册</el-menu-item>
                    <el-menu-item index="/login" class="box-NavBar-list box-NavBar-item">登录</el-menu-item>
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
                if(key == '/home') {
                    this.$router.push('/')
                }else {
                    this.$router.push(key)
                }
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
