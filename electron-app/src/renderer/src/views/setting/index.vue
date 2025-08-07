<template>
  <div class="main">
    <el-card id="content_box" class="w100" shadow="never" :body-style="{ padding: '15px' }">
      <!-- <SearchForm
        id="searchForm"
        :searchData="searchData"
        :searchForm="searchForm"
        :searchHandle="searchHandle"
      >
      </SearchForm> -->

      <el-table
        :data="tableData"
        border
        stripe
        :header-cell-style="headerStyle"
        style="width: 100%"
      >
        <el-table-column type="index" label="#" width="60" />
        <el-table-column label="预览" prop="ProjectEngineerName" width="200" />
        <el-table-column label="生成日期" prop="ProjectEngineerCode" />

        <el-table-column label="操作" width="200">
          <template #default="scope">
            <!-- plain -->
            <el-button type="primary" size="small" @click="addRelate(scope.row)">
              导出
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
/**
 * 工程关联 客户
 */
import {
  onMounted,
  onBeforeMount,
  computed,
  reactive,
  getCurrentInstance,
  ref,
  toRefs,
  provide
} from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { mainApi } from '@/api/index.js'

let headerStyle = {
  background: '#f5f5f5',
  color: '#666666',
  fontSize: '14px',
  fontWeight: 700,
  // border: 'none',
  height: '49px'
}
// // provide('calsType', 'crm:clue:query:highSeas');
const state = reactive({
  searchData: {
    projectEngineerName: null,
    projectEngineerCode: null,
    customerNo: null
  },
  selectList: [],
  requestData: {},
  searchForm: [
    {
      type: 'input',
      prop: 'projectEngineerName',
      width: '180px',
      placeholder: '工程名称',
      change: () => {}
    },
    {
      type: 'input',
      prop: 'projectEngineerCode',
      width: '180px',
      placeholder: '工程代码',
      change: () => {}
    },
    {
      type: 'input',
      prop: 'customerNo',
      width: '180px',
      placeholder: '客户代码',
      change: () => {}
    }
  ],
  searchHandle: [
    {
      label: '查询',
      type: 'primary',
      icon: 'Search',
      handle: () => check()
    }
  ],
  tableHandles: [],
  tableCols: [
    { prop: 'UserName', label: '用户名', default: true }, //
    {
      prop: 'Code',
      label: '用户代码'
    }, //
    {
      label: '操作',
      type: 'Button',
      width: '150px',
      fixed: 'right',
      btnList: [
        {
          type: 'primary',
          label: '编辑',
          icon: 'Edit',
          size: 'small',
          //roleId: 'crm:clue:update',
          // isShow: () => user.userLevel == 2,
          handle: (row, i) => update(row, i)
        }
      ]
    }
  ],
  tableData: [{}],
  appTableData: [],
  pagination: { pageSize: 15, pageIndex: 1, total: 0 },
  treeData: [],
  allList: []
})

const { searchData, searchForm, searchHandle, tableData } = toRefs(state)

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

.treeBox {
  // border: 1px solid red;
  // width: calc(100% - 50px);
  padding-left: 110px;
  // margin: 0 auto;
}
</style>
