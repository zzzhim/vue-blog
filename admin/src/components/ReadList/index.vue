<template>
    <div style="height:100%">
        <head-nav></head-nav>
        <aside-a></aside-a>
        <div class="list-container main">
            <h2>
                阅读列表 /
                <span>READING LIST</span>
            </h2>
            <hr>
            <main>
                <div class="article-list">
                    <section class="btn-container">
                        <button id="add" class="not-del" @click="Addbook">添加书籍</button>
                    </section>
                    <main-m></main-m>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
    import Aside from '../common/Aside.vue'
    import HeadNav from '../common/HeadNav.vue'
    import Main from './Main.vue'
    import request from '@/utils/request'
    import Editor from '../common/Editor.vue'
    import { mapMutations } from 'vuex'

    export default {
        data() {
            return {

            }
        },
        methods: {
            ...mapMutations(['SET_READLIST']),
            Addbook() {
                this.SET_READLIST('/addBooks')
                this.show()
            },
            show () {
                this.$modal.show('hello-world')
            },
        },
        components: {
            'aside-a': Aside,
            'head-nav': HeadNav,
            'main-m': Main
        }
    }
</script>

<style lang="scss" scoped>
@import '../../assets/style/variable.scss';

main {
    @include flex($justify: space-between);
    height: calc(100% - 48px);
    padding: 0.5em 0;
}

.article-list {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 0 0.8em 0.5em 0;
    .list {
        // margin: 0;
        padding: 0;
        list-style: none;
    }
}

.editor {
    width: 58%;
    height: 100%;
    padding: 0 0.8em 0.5em 0;
    overflow: auto;
}
</style>