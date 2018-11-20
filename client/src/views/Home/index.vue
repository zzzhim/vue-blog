<template>
    <el-container direction="vertical">
        <v-header></v-header>
        <el-container>
            <v-aside width="200px">Aside</v-aside>
            <v-main>Main</v-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from './Header.vue'
    import Aside from './Aside.vue'
    import Main from './Main.vue'


    export default {
        name: 'home',
        data() {
            return {
                
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
