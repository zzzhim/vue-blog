<template>
    <div class="editor">
        <input type="text" class="title" id="title" v-model="title">
        <div class="operate-bar">
            <section class="tag-container">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tag"></use>
                </svg>
                <ul class="tags">
                    <li class="tag" v-for="(tag, index) in getTags" :key="index">
                        {{ tag }}
                        <sup>X</sup>
                    </li>
                </ul>
                <input type="text" class="tag-input" id="tag-input" value="" >
                <span class="tag-add">+</span>
            </section>
            <section class="btn-container">
                <button id="delete" class="delete">删除文章</button>
                <button id="submit" class="not-del" @click="">发布文章</button>
            </section>
        </div>
        <p class="tips">标签查询页面只能批量更改标签,修改的文章内容会自动保存</p>
        <div class="content">
            <textarea name="" id=""></textarea>
        </div>
    </div>
</template>

<script>
    import SimpleMDE from 'simplemde'
    import 'simplemde/dist/simplemde.min.css'
    import { mapState, mapGetters } from 'vuex'

    export default {
        data() {
            return {
                simplemde: '', // 编辑器
                // title: '', // 文章标题
                // tags: '', // 标签
                // isPublished: '' //是否发布
            }
        },
        computed: {
            // 将vuex里面的正在编辑的文章的相关信息输出到编辑器里面
            ...mapState(['id', 'title', 'content', 'isPublished']),
            ...mapGetters(['getTags']),
        },
        methods: {

        },
        mounted() {
            this.simplemde = new SimpleMDE({
                // autoDownloadFontAwesome: false,
                placeholder: 'Talk to me, Ashen one...',
                spellChecker: false,
                toolbarTips: false
            })
        },
        // 监控ID值的变化,如果一旦发生变化,就直接将内容变化
        watch: {
            id (newVal, oldVal) {
                // 将vuex里面的正在编辑的文章的相关信息输出到编辑器里面
                this.simplemde.value(this.content)
            }
        }
    }

</script>


<style lang="scss" scoped>
    @import '../../assets/style/variable.scss';

    .title {
        margin-bottom: 0.3em;
        width: 100%;
        height: 2em;
        border: none;
        font-size: 2.4rem;
        color: $title;
        outline: none;
        border-bottom: 1px solid $special;
        background: none;
        text-align: center;
    }
    .operate-bar {
        @include flex($justify: space-between);
        height: 4em;
        font-size: 1.3rem;
        margin-bottom: 1em;
        .tag-container {
            @include flex($justify: flex-start);
            .icon {
                width: 1.5em;
                height: 1.5em;
                margin-right: 10px;
            }
            .tags {
                @include flex;
                list-style: none;
                margin-right: 10px;
                padding: 0;
                .tag {
                    margin-right: 10px;
                    color: $base;
                    position: relative;
                    &:last-child {
                        margin-right: 0px;
                    }
                }
            }
            .tag-add {
                font: {
                    weight: 600;
                    size: 1.6rem;
                }
                color: $special;
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
    .tips {
        color: $quote;
        text-align: center;
    }
    .content {
        font-size: 1.6rem;
    }
</style>
