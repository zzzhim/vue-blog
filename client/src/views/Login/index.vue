<template>
    <el-container direction="vertical">
        <v-header></v-header>
        <el-main>
            <el-row>
                <el-col :span="12" :offset="6">
                    <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="账户" prop="username">
                            <el-input v-model="userForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('userForm')">登录</el-button>
                            <el-button @click="resetForm('userForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import Header from '@/components/Header'
    import request from '@/utils/request'
    import { setToken } from '@/utils/auth.js'

    export default {
        data() {
            // 密码验证
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'))
                } else {
                    let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/
                    if (!reg.test(value)) {
                        callback(new Error("密码长度需6-16位，且包含字母和字符"))
                    } else {
                        callback()
                    }
                }
            }
            return {
                activeIndex: '/login',
                userForm: {
                    username: null,
                    password: null
                },
                rules: {
                    password: [
                        {  required: true, validator: validatePass, trigger: 'blur' },
                        {
                            min: 6,
                            max: 12,
                            message: "密码必须在6-12位之间",
                        }
                    ],
                    username: [
                        { required: true, message: "请输入用户名", trigger: "blur" },
                        {
                            min: 6,
                            max: 16,
                            message: "用户名必须在6-16位之间",
                        }
                    ],
                },
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        request({
                            url: '/login',
                            method: 'post',
                            data: this.userForm
                        }).then(async res => {
                            const { success, message, token=null } = res
                            if(success) {
                                this.$message({ // 消息提示
                                    message,
                                    type: 'success'
                                })
                                await setToken(token)
                                this.$router.push('/')
                            }else {
                                this.$message({ // 消息提示
                                    message,
                                    type: 'warning'
                                })
                            }
                        })
                    } else {
                        this.$message({ // 消息提示
                            message: '登录失败',
                            type: 'warning'
                        })
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
        components: {
            'v-header': Header,
        }
    }
</script>


<style lang="less" scoped>
</style>
