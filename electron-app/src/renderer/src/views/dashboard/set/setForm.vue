<template>
  <div class="form_box">
    <div class="mb10">
      <el-button type="primary" style="width: 90px" @click="fileDown"> 导出</el-button>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </div>
    <div>
      <el-form style="max-width: 600px" :model="screenData" label-width="auto" label-position="top">
        <el-row :gutter="14">
          <el-col :span="17">
            <el-form-item label="logo 设置" class="mb10">
              <el-select v-model="screenData.logo" placeholder="">
                <el-option label="SCSPCBA 白底" value="scspcba_white" />
                <el-option label="SUCCESS 白底" value="success_white" />
                <el-option label="pcbonline 白底" value="pcbonline_white" />
                <el-option label="旭森制造" value="xsjg_white" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="大小" class="mb10">
              <el-input-number
                controls-position="right"
                v-model="screenData.logoSize"
                :precision="0"
                :step="1"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="14">
          <el-col :span="17">
            <el-form-item label="公司名称" class="mb10">
              <el-input v-model="screenData.title" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="字号" class="mb10">
              <el-input-number
                controls-position="right"
                v-model="screenData.titleSize"
                :precision="0"
                :step="1"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="14">
          <el-col :span="17">
            <el-form-item label="欢迎语" class="mb10">
              <el-input v-model="screenData.welcomeName" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="字号" class="mb10">
              <el-input-number
                controls-position="right"
                v-model="screenData.welcomeNameSize"
                :precision="0"
                :step="1"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="底部词" class="mb10">
          <el-row :gutter="14">
            <el-col :span="12" class="mb10">
              <el-input v-model="screenData.bottomline.txt1" />
            </el-col>
            <el-col :span="12" class="mb10">
              <el-input v-model="screenData.bottomline.txt2" />
            </el-col>
            <el-col :span="12">
              <el-input v-model="screenData.bottomline.txt3" />
            </el-col>
            <el-col :span="12">
              <el-input v-model="screenData.bottomline.txt4" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="地区" class="mb10">
          <el-row :gutter="14">
            <el-col :span="12">
              <el-input v-model="screenData.bottom.txtleft" />
            </el-col>
            <el-col :span="12">
              <el-input v-model="screenData.bottom.txtright" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
/**
 * 生成海报
 */
import { onMounted, onBeforeMount, computed, reactive, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import html2canvas from 'html2canvas'
import { useAppStore } from '@/store/app.js'
const app = useAppStore()

let screenData = computed(() => app.screenData)

const state = reactive({})

let fileDown = async () => {
  let element = document.querySelector('#viewBox')
  html2canvas(element, {
    onclone: function (documentClone) {
      documentClone.getElementById('viewBox').style.transform = 'scale(1)'
    },
    scale: window.devicePixelRatio * 3
  }).then((canvas) => {
    canvas.toBlob((blob) => {
      let a = document.createElement('a')
      a.style.display = 'none'
      const link = window.URL.createObjectURL(blob)
      a.href = link
      a.download = '欢迎大屏_' + screenData.value.title
      a.click()
      a = null
      setTimeout(() => {
        URL.revokeObjectURL(link)
      }, 1000)
    })
  })
}

onMounted(() => {})

let handChange = (type) => {}

onBeforeMount(() => {})

let onSubmit = () => {}
</script>

<style lang="scss" scoped>
.form_box {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}

#content_box {
  width: 100%;
  height: 100%;
}

#viewBox {
  background-image: url('@/assets/design/design_bg.png');
  background-size: 100% 100%;
  width: 1920px;
  height: 1080px;
  position: relative;
}
.mb10 {
  margin-bottom: 10px;
}
</style>
