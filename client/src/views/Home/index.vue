<template>
    <el-container direction="vertical">
        <v-header></v-header>
        <el-container>
            <v-aside></v-aside>
            <v-main></v-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from '@/components/Header'
    import Aside from './Aside.vue'
    import Main from './Main.vue'

    export default {
        name: 'home',
        data() {
            return {
                activeIndex: "/home"
            }
        },
        components: {
            'v-header': Header,
            'v-aside': Aside,
            'v-main': Main
        }
    }
</script>


<style lang="less" scoped>

</style>
