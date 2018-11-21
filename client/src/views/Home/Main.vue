<template>
    <el-main>
        <el-row>
            <el-col :span="24">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="box-card-header">
                        <router-link to="" class="box-card-header-title" tag="h1">{{ '欢迎来到Blog!' }}</router-link>
                    </div>
                    <div class="box-card-content">
                        <time class="box-card-content-time">{{ '2018年 1月 02日 16:07:26' }}</time>
                        <div class="box-card-content-title">{{ 'Enjoy ur self here!' }}</div>
                        <router-link tag="footer" to="" class="box-card-content-footer">
                            {{ '... continue reading' }}
                        </router-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style lang="less">
    .box-card {

        .el-card__header {
            border-bottom: none;
            padding-bottom: 0px;
        }

        &-header {
            &-title {
                cursor: pointer;
                font-size: 22px;
                font-weight: bold;
                line-height: 1;
                display: inline-block;
                position: relative;
                &::after {
                    content: '';
                    display: block;
                    width: 0%;
                    height: 10%;
                    background: #f18f01;
                    transition: width 1s;
                    position: absolute;
                    margin-top: 5%;
                }
                &:hover::after {
                    width: 100%;
                }
            }
        }

        &-content {

            &-time {
                display: block;
                margin-bottom: 18px;
                color: #c1bfb5;
                font-weight: 600;
            }

            &-title {
                color: #34495e;
                font-size: 14px;
                margin-bottom: 14px;
            }

            &-footer {
                color: #f18f01;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }
</style>
