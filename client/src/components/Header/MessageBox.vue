<template>
    <div class="cropper">
        <vue-cropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :fixedBox="true"
            :autoCrop="true"
            :autoCropWidth="100"
            :autoCropHeight="100"
        >
        </vue-cropper>
        <div class="text-center">
            <el-upload
            class="upload-demo"
            :style="{ 'display': 'inline-block', 'margin': '10px' }"
            action=""
            ref="upload"
            :headers="{}"
            :multiple="false"
            :show-file-list="false"
            :limit="1"
            :auto-upload="false"
            :on-change="imgUpload"
            >
            <el-button size="small" type="primary">上传图片</el-button>
            </el-upload>
            <el-button type="danger" class="button" :style="{ 'margin': '10px 0px' }" @click="upDataImg">开始截图</el-button>
        </div>
    </div>
</template>

<script>
    import { VueCropper }  from 'vue-cropper'
    import request from '@/utils/request'
    import { getusername } from '@/utils/auth'
    import { mapMutations } from 'vuex'

    export default {

        data() {
            return {
                option: {
                    img: '',
                    size: 1,
                    outputType: 'jpeg',
                },
            }
        },
        methods: {
            ...mapMutations(['SET_IMGPATH']),
            upDataImg() {
                const username = getusername()
                // 上传头像
                this.$refs.cropper.getCropData((data) => {
                    if(data) {
                        request({
                        url: '/homeImg',
                        method: 'post',
                        data: {
                            data,
                            username
                        }
                        }).then(res => {
                            this.$message({
                                showClose: true,
                                message: res.message,
                                type: 'success'
                            })
                            this.SET_IMGPATH(res.ImgUrl)
                        })
                    }
                })
            },
            imgUpload(file) {
                if(file) {
                    // 获取图片地址
                    let imgUrl = URL.createObjectURL(file.raw)
                    this.option.img = imgUrl
                    // 清空已上传图片
                    this.$refs.upload.clearFiles()
                }
            }
        },
        components: {
            'vue-cropper': VueCropper,
        }
    }
</script>

<style lang="less" scoped>
    .cropper{
        width: 350px;
        height: 300px;
        display: inline-block;
        margin-left: 50%;
        transform:  translateX(-50%);
    }
</style>
