<template>
    <el-container direction="vertical">
        <v-header></v-header>
        <v-main></v-main>
    </el-container>
</template>

<script>
    import Header from '@/components/Header'
    import Main from './Main.vue'

    export default {
        name: 'readList',
        data() {
            return {
                activeIndex: "/readList"
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
