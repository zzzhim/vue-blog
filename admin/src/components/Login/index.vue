<template>
    <div class="login-container">
        <header class="login-head">
            <span>博客系统</span>
            <img class="logo" src="../../assets/image/logo.png" alt="">
        </header>

        <section class="form">
            <span class="slogan">登登登登...录!
                <span>/ Login</span>
            </span>
            <input name="user" v-validate="'required|min:5|max:16|alpha_dash'" type="text" id="user" placeholder="请输入用户名" v-model="LoginForm.user">
            <input name="password" v-validate="'required|alpha_num'" type="password" id="password" placeholder="请输入密码" v-model="LoginForm.password" @keydown.enter="login">
            <button id="login" @click="login">登录</button>
        </section>
        <footer>Always.</footer>
        <!-- <span>{{errors.first('user')}}</span> -->
        <notifications group="user"></notifications>

    </div>
</template>

<script>
    // 引入请求的模块
    import request from '@/utils/request'
        // 设置验证的方法
    import { Validator } from 'vee-validate'
    // 引入设置cookie的方法

    import { setToken } from '@/utils/auth.js'

    const dict = {
        custom: {
            user: {
                required: '您的用户名不能为空'
            },
            password: {
                required: () => '您的密码不能为空'
            }
        }
    }

    Validator.localize('en', dict);
    export default {
        name: 'Login',
        data() {
            return {
                LoginForm: {
                    user: '',
                    password: ''
                }
            }
        },
        methods: {
            // 登陆方法
            login() {
                // 首先拿到验证成功失败的结果，如果成功了，在进行登录，如果失败了，则进行消息提示。。。
                if(this.errors.items.length === 0) {
                    // console.log('全部成功');
                    request({
                        url: '/login',
                        method: 'post',
                        data: this.LoginForm
                    }).then(res => {
                        console.log(res);
                        if(res.success) {
                            const token = res.token
                            // 把token存到cookie
                            setToken(token)

                            this.$store.commit('SET_TOKEN', token)
                            this.$router.push('/list')
                        }else {
                            // 如果用户名、密码不正确,要给出提示
                            this.$notify({
                                type: 'error',
                                group: 'user',
                                title: '登录失败',
                                text: res.message
                            })
                            // this.LoginForm = {}
                        }
                    }).catch(err => {
                        // 如果发请求的时候有错误,把错误扔到控制台中
                        console.log(err);
                        // 要先得到token值,将token值存到cookie里面去

                        // 跳转到博客系统的首页,也就是/list页面
                    })
                }else {
                    console.log('验证没有通过')
                    this.$notify({
                        width: 1000,
                        type: 'warn',
                        group: 'user',
                        title: '验证失败',
                        text: 'hello user!!!!'
                    })
                }
            },
        },
        // 钩子函数,当组件加载完毕的时候自动执行
        mounted() {
            // request({
            //     url: "/index",
            //     method: 'get'
            // }).then((res) => {
            //     console.log(res);
            // })
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/style/variable.scss';

.login-container {
    height: 100%;
    @include flex($flow: column wrap);
    font-family: "KaiShu", "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    .login-head {
        @include flex;
        width: 100%;
        height: 3em;
        font-size: 2rem;
    }

    .form {
        @include flex($flow: column wrap);
        width: 400px;
        height: 250px;
        border-top: 20px solid $base;
        border-radius: 5px;
        // box-shadow: 4px 4px 5px -3px rgba(0, 0, 0, .3);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.6);
        .slogan {
            font-size: 1.6rem;
            margin-bottom: 1em;
            //color: $quote;
            span {
                color: $base;
            }
        }
        input {
            font: {
                size: 1rem;
                family: Dosis, Arial, sans-serif;
            }
            margin-bottom: 2em;
            width: 20em;
            height: 2.5em;
            outline-color: $base;
            border-radius: 3px;
            border: 1px solid #ccc;
        }
        button {
            color: $white;
            font: {
                size: 1.6rem;
                family: KaiShu, Arial, sans-serif;
            }
            width: 6em;
            height: 2em;
            border: none;
            background: $base;
            outline: none;
            cursor: pointer;
        }
    }

    footer {
        height: 4em;
        @include flex;
        justify-self: flex-end;
    }
}
</style>