<template>
    <div style="height: 100%">
        <head-nav></head-nav>
        <aside-a></aside-a>
        <div class="list-container main">
            <h2>
                关于我 /
                <span>ABOUT ME</span>
            </h2>
            <hr>
            <main>
                <textarea></textarea>
                <button id="submit" class="not-update" @click="autosave">发布文章</button>
            </main>
        </div>
    </div>
</template>

<script>
    import Aside from '../common/Aside.vue'
    import HeadNav from '../common/HeadNav.vue'
    import request from '@/utils/request'
    import debounce from 'lodash.debounce'

    import 'simplemde/dist/simplemde.min.css'
    import SimpleMDE from 'simplemde'

    export default {
        data() {
            return {
                simplemde: '', // 编辑器
                showTags: false,
                data: null
            }
        },
        computed: {
            
        },
        methods: {
            // 自动保存时对debounced函数的后续调用将返回最后一次func调用的结果
            autosave: debounce(function() {
                this.data = this.simplemde.value()
            }, 1000),
        },
        mounted() {
            // 编辑器基本配置
            this.simplemde = new SimpleMDE({
                autoDownloadFontAwesome: true,
                autofocus: true
            })
            //绑定编辑器的按键事件以及复制、黏贴的事件发生
            // 每当编辑器触发事件时，就会调用auotosave事件，从而实现自动保存功能
            this.simplemde.codemirror.on('keyHandler',()=>this.autosave())
            this.simplemde.codemirror.on('inputRead',()=>this.autosave())
        },
        created() {
            request({
                url: '/about',
                method: 'get'
            }).then(res => {
                this.simplemde.value(res[0].content)
            }).catch(err => {
                console.log(err);
            })
        },
        watch: {
            data(newVal, oldVal) {
                request({
                    url: '/about',
                    method: 'post',
                    data: {
                        data:this.data
                    }
                }).then(res => {
                    if(res.success) {
                        return true
                    }else {
                        return false
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        components: {
            'aside-a': Aside,
            'head-nav': HeadNav
        },
    }
</script>

<style lang="scss" scoped>
    h1 {
        padding-bottom: 1em;
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
    }

    ul {
        padding-left: 1.2em;
        li {
            margin: 1em auto;
        }
    }
    .not-update {
        color: #fefdff;
        background: #f18f01;
        border: 1px solid #f18f01;
        float: right;
        cursor: pointer;

        &:hover {
            color: #f18f01;
            background: #fefdff;
        }
        &:focus {
            outline: none;
        }
    }
</style>
