<template>
    <el-container direction="vertical">
        <v-header :activeIndex="activeIndex"></v-header>
        <v-main></v-main>
    </el-container>
</template>

<script>
    import Header from '@/components/Header'
    import Main from './Main.vue'

    export default {
        name: 'About',
        data() {
            return {
                activeIndex: "/about"
            }
        },
        components: {
            'v-header': Header,
            'v-main': Main
        }
    }
</script>

<style lang="less" scoped>

</style>
