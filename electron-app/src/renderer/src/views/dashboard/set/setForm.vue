<template>
  <div class="form_box" v-loading="loading">
    <div class="mb10">
      <el-button type="primary" style="width: 90px" @click="fileDown"> 导出</el-button>

      <el-button @click="init">重置</el-button>
      <el-popconfirm class="box-item" title="确定保存吗" @confirm="onSubmit">
        <template #reference>
          <el-button type="primary">保存</el-button>
        </template>
      </el-popconfirm>
    </div>
    <div>
      <el-form style="max-width: 600px" :model="screenData" label-width="auto" label-position="top">
        <el-row :gutter="14">
          <el-col :span="17">
            <el-form-item label="公司名称" class="mb10">
              <el-input v-model="screenData.title_cn" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="字号" class="mb10">
              <el-input-number
                controls-position="right"
                v-model="screenData.title_cn_size"
                :precision="0"
                :step="1"
              />
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item label="公司英文" class="mb10">
              <el-input v-model="screenData.title_en" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="字号" class="mb10">
              <el-input-number
                controls-position="right"
                v-model="screenData.title_en_size"
                :precision="0"
                :step="1"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="是否显示欢迎语" class="mb10">
          <el-radio-group v-model="screenData.is_welcome">
            <el-radio :value="1" size="large">显示</el-radio>
            <el-radio :value="0" size="large">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="screenData.is_welcome === 1">
          <el-row :gutter="14">
            <el-col :span="17">
              <el-form-item label="欢迎语" class="mb10">
                <el-input v-model="screenData.welcome_cn" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="字号" class="mb10">
                <el-input-number
                  controls-position="right"
                  v-model="screenData.welcome_cn_size"
                  :precision="0"
                  :step="1"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="14">
            <el-col :span="17">
              <el-form-item label="欢迎语英文" class="mb10">
                <el-input v-model="screenData.welcome_en" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="字号" class="mb10">
                <el-input-number
                  controls-position="right"
                  v-model="screenData.welcome_en_size"
                  :precision="0"
                  :step="1"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-form>
    </div>
  </div>
</template>

<script setup>
/**
 * 获取云端的配置
 */
import { onMounted, onBeforeMount, computed, reactive, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import html2canvas from 'html2canvas'
import { useAppStore } from '@/store/app.js'
import { useUserStore } from '@/store/user.js'
const app = useAppStore()
const user = useUserStore()
let screenData = computed(() => app.setHomeData)
// let screenData = computed(() => app.screenData)
const loading = ref(false)

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

let init = () => {
  loading.value = true
  user.init().then((res) => {
    app.setHomeData = res
    loading.value = false
  })
}
onMounted(() => {})

let handChange = (type) => {}

onBeforeMount(() => {
  init()
})

let onSubmit = () => {
  loading.value = true
  let params = JSON.parse(JSON.stringify(app.setHomeData))

  user.edit(params).then((res) => {
    loading.value = false
  })
}
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
