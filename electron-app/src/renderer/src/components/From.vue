<template>
  <div class="ces-search">
    <el-form :size="size" ref="form" inline :label-width="labelWidth" class="from_item">
      <template v-for="item in searchForm" :key="item.label">
        <el-form-item
          :label="item.label"
          :prop="searchData[item.prop]"
          :required="item.required || false"
          class="from_item"
          v-if="!item.isShow || (item.isShow && item.isShow())"
        >
          <!-- 输入框 -->
          <el-input
            v-if="item.type === 'input'"
            v-model="searchData[item.prop]"
            :size="size || item.size"
            :style="{ width: item.width }"
            :clearable="item.clearable === false ? false : true"
            @change="item.change(that, searchData[item.prop])"
            :placeholder="item.placeholder || ''"
            :readonly="item.readonly === true ? true : false"
            :disabled="item.disable && item.disable(searchData[item.prop])"
          />
          <!-- 下拉框 -->
          <el-select
            v-if="item.type === 'select'"
            v-model="searchData[item.prop]"
            :size="size || item.size"
            :style="{ width: item.width }"
            @change="item.change(that, searchData[item.prop])"
            :placeholder="item.placeholder || ''"
            :clearable="item.clearable === false ? false : true"
            :disabled="item.disable && item.disable(searchData[item.prop])"
          >
            <el-option
              v-for="op in item.options"
              :label="op.label"
              :value="op.value"
              :key="op.value"
            />
          </el-select>
          <!-- 输入框 第二种 -->
          <div v-if="item.type === 'input2'">
            <el-input
              v-model="searchData[item.prop]"
              :size="size || item.size"
              :style="{ width: item.width }"
              @change="item.change(that, searchData[item.prop])"
              :placeholder="item.placeholder || ''"
              :disabled="item.disable && item.disable(searchData[item.prop])"
              :readonly="true"
            />
            <el-button
              style="margin-left: 10px"
              :type="item.type"
              :icon="item.icon || ''"
              :size="size || item.size"
              @click="item.handle(that)"
              >选择</el-button
            >
          </div>

          <!-- 单选 -->
          <el-radio-group
            v-if="item.type === 'radio'"
            v-model="searchData[item.prop]"
            :style="{ width: item.width }"
            @change="item.change(that, searchData[item.prop])"
            :size="size || item.size"
            :disabled="item.disable && item.disable(searchData[item.prop])"
          >
            <el-radio v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{
              ra.label
            }}</el-radio>
          </el-radio-group>
          <!-- 单选按钮 -->
          <el-radio-group
            v-if="item.type === 'radioButton'"
            v-model="searchData[item.prop]"
            :style="{ width: item.width }"
            @change="item.change && item.change(that, searchData[item.prop])"
            :size="size || item.size"
            :disabled="item.disable && item.disable(searchData[item.prop])"
          >
            <el-radio-button v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{
              ra.label
            }}</el-radio-button>
          </el-radio-group>
          <!-- 复选框 -->
          <el-checkbox-group
            v-if="item.type === 'checkbox'"
            v-model="searchData[item.prop]"
            :style="{ width: item.width }"
            @change="item.change(that, searchData[item.prop])"
            :size="size || item.size"
            :disabled="item.disable && item.disable(searchData[item.prop])"
          >
            <el-checkbox v-for="ch in item.checkboxs" :label="ch.value" :key="ch.value">{{
              ch.label
            }}</el-checkbox>
          </el-checkbox-group>
          <!-- 日期 -->
          <el-date-picker
            v-if="item.type === 'date'"
            v-model="searchData[item.prop]"
            :style="{ width: item.width }"
            :size="size || item.size"
            value-format="yyyy-MM-dd"
            type="date"
            :placeholder="item.placeholder || ''"
          />
          <!-- 时间 -->
          <el-time-select
            v-if="item.type === 'time'"
            v-model="searchData[item.prop]"
            type
            :style="{ width: item.width }"
            @change="item.change(that, searchData[item.prop])"
            :size="size || item.size"
            :disabled="item.disable && item.disable(searchData[item.prop])"
          />
          <!-- 日期时间 -->
          <el-date-picker
            v-if="item.type === 'dateTime'"
            type="datetime"
            :style="{ width: item.width }"
            v-model="searchData[item.prop]"
            @change="item.change(that, searchData[item.prop])"
            :size="size || item.size"
            :disabled="item.disable && item.disable(searchData[item.prop])"
          />

          <!-- 开关 -->
          <el-switch
            v-if="item.type === 'switch'"
            v-model="searchData[item.prop]"
            :size="size || item.size"
            @change="item.change(that, searchData[item.prop])"
            :style="{ width: item.width }"
            :disabled="item.disable && item.disable(searchData[item.prop])"
          ></el-switch>

          <el-cascader
            v-if="item.type === 'cascader'"
            v-model="searchData[item.prop]"
            :options="item.options"
            :props="props1"
            :width="item.width"
            :placeholder="item.placeholder || ''"
            @change="item.change(that, searchData[item.prop])"
            clearable
          />
        </el-form-item>
      </template>
      <template v-if="isHandle">
        <el-form-item v-for="item in searchHandle" :key="item.label" class="from_item">
          <el-button
            :type="item.type"
            :icon="item.icon || ''"
            :size="size || item.size"
            @click="item.handle(that)"
            >{{ item.label }}</el-button
          >
        </el-form-item>
        <slot />
      </template>
    </el-form>
    <el-form inline v-if="isHandle && false" class="inlineBlock">
      <el-form-item v-for="item in searchHandle" :key="item.label" class="from_item">
        <el-button
          :type="item.type"
          :icon="item.icon || ''"
          :size="size || item.size"
          @click="item.handle(that)"
          >{{ item.label }}</el-button
        >
      </el-form-item>
      <slot />
    </el-form>
  </div>
</template>

<script>
/**
 * 搜索表单组件封装
 */

export default {
  components: {},
  props: {
    that: { type: Object, default: this },
    isHandle: { type: Boolean, default: true },
    labelWidth: { type: String, default: '' },
    size: { type: String, default: 'default' },
    searchForm: { type: Array, default: () => [] },
    searchHandle: { type: Array, default: () => [] },
    searchData: { type: Object, default: () => {} },
    ssss: { type: Boolean, default: true },
    rules: [],
    refName: { type: String, default: '' }
  },
  data() {
    return {
      props1: {
        checkStrictly: true,
        value: 'id',
        label: 'name'
      }
    }
  }
}
</script>
<style>
.from_item {
  display: inline-block;
  margin-right: 20px !important;
}
.inlineBlock {
  display: inline-block;
}
.el-form-item__content {
  line-height: normal !important;
}
.ces-search .el-input__inner::placeholder,
.ces-search .is-transparent span,
.ces-search .el-date-editor .el-range-input::placeholder {
  color: #666 !important; /* 设置占位符文字颜色 */
}
.ces-search .el-input__inner,
.ces-search .el-select__selected-item span,
.ces-search .el-date-editor .el-range-input {
  color: #000; /* 设置占位符文字颜色 */
}
</style>
