<template>
    <el-aside>
        <el-row class="tac">
            <el-col :span="24">
                <el-menu
                    default-active="2"
                    class="tac-demo"
                >
                <el-menu-item index="2" class="tac-demo-menu">
                    <span slot="title" class="tac-demo-menu-title">待定</span>
                </el-menu-item>
                <el-menu-item index="3" class="tac-demo-menu">
                    <span slot="title" class="tac-demo-menu-title">待定</span>
                </el-menu-item>
                <el-menu-item index="4" class="tac-demo-menu">
                    <span slot="title" class="tac-demo-menu-title">待定</span>
                </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </el-aside>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>


<style lang="less" scoped>
    .tac {
        
        &-demo {

            &-menu {

                &-title {
                    display: block;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
</style>
