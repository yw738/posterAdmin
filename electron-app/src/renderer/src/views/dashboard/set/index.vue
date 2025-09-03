<template>
  <div class="main">
    <el-row id="content_box" :gutter="16">
      <el-col :span="18" style="height: 100%">
        <el-card
          class="h100"
          shadow="never"
          ref="leftBox"
          :body-style="{ padding: '0', height: '100%' }"
        >
          <!-- <div id="viewBox" :style="headerStyle">
            <ComName />
          </div> -->
          <HomeCom :style="headerStyle" />
        </el-card>
      </el-col>
      <el-col :span="6" style="height: 100%">
        <el-card class="h100" shadow="never" :body-style="{ padding: '10px ', height: '100%' }">
          <!-- <PosterForm /> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
/**
 * 首页设置
 */
import {
  onMounted,
  onBeforeMount,
  computed,
  reactive,
  getCurrentInstance,
  ref,
  toRefs,
  watch
} from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { mainApi } from '@/api/index.js'
import HomeCom from './left/index.vue'
import PosterForm from './posterForm.vue'
import { useAppStore } from '@/store/app.js'
const app = useAppStore()
let leftBox = ref(null)
let headerStyle = ref({
  transform: '',
  'transform-origin': ' 0 0',
  'font-family': 'AlibabaPuHuiTi-Heavy'
})

// provide('calsType', 'crm:clue:query:highSeas');
const state = reactive({
  searchData: {
    projectEngineerName: null,
    projectEngineerCode: null,
    customerNo: null
  },
  selectList: [],
  requestData: {},
  searchForm: [],

  tableData: [{}],
  appTableData: [],
  pagination: { pageSize: 15, pageIndex: 1, total: 0 },
  treeData: [],
  allList: []
})

let init = () => {
  let box = leftBox.value.$el
  let width = box.offsetWidth
  let scale = width / 1920
  headerStyle.value.transform = `scale(${scale})`
}
onMounted(() => {
  window.onresize = () => {
    init()
  }
  init()
})

const {} = toRefs(state)

const addRef = ref(null)

const emit = defineEmits(['openApp'])
onBeforeMount(() => {
  onSubmit()
})

const check = () => {
  state.pagination.pageIndex = 1
  onSubmit()
}

let addRelate = (row) => {
  addRef?.value?.init({ ...row })
}

let del = (row, i) => {
  ElMessageBox.confirm('确定取消客户关联吗？', '提示')
    .then(() => {
      mainApi
        ?.cancelRelate({
          ProjectEngineerId: row.engId,
          CustomerCode: row.code
        })
        .then((res) => {
          ElMessage.success('设置成功')
          onSubmit()
        })
    })
    .catch(() => {})
}

const onSubmit = () => {
  //   mainApi.getList(state.searchData).then((res) => {
  //     state.tableData =
  //       res?.Data?.map((v) => {
  //         let CustomerCodes = v.CustomerCodes.map((s) => ({
  //           engId: v.ProjectEngineerId,
  //           code: s
  //         }))
  //         return {
  //           ...v,
  //           CustomerCodes
  //         }
  //       }) || []
  //   })
}
</script>

<style lang="scss" scoped>
.main {
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  margin: 15px auto;
}

#content_box {
  width: 100%;
  height: 100%;
}

#viewBox {
  background-image: url('@/assets/design/home_bg.png');
  background-size: 100% 100%;
  width: 1920px;
  height: 1080px;
  position: relative;
}
.h100 {
  height: 100%;
}
</style>
