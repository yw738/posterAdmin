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
          <div
            id="designCanvas"
            :style="headerStyle"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @click="handleCanvasClick"
          >
            <!-- 所有元素 -->
            <div
              v-for="element in elements"
              :key="element.id"
              class="canvas-element"
              :class="{ selected: selectedElementId === element.id }"
              :style="getElementStyle(element)"
              @mousedown="startDragElement(element, $event)"
              @click.stop="selectElement(element.id)"
            >
              <!-- 图片元素 -->
              <div
                v-if="element.type === 'image'"
                class="image-element"
                :style="getImageElementStyle(element)"
              >
                <img
                  :src="element.imageUrl"
                  :alt="'图片元素'"
                  :style="getImageStyle(element)"
                />
              </div>

              <!-- 文字元素 -->
              <div
                v-else
                class="element-content"
                :style="getElementContentStyle(element)"
              >
                {{ element.text }}
              </div>

              <!-- 控制点 -->
              <div
                v-if="selectedElementId === element.id"
                class="element-controls"
              >
                <div
                  class="control-point control-point-tl"
                  @mousedown.stop="startResize('tl', $event)"
                ></div>
                <div
                  class="control-point control-point-tr"
                  @mousedown.stop="startResize('tr', $event)"
                ></div>
                <div
                  class="control-point control-point-bl"
                  @mousedown.stop="startResize('bl', $event)"
                ></div>
                <div
                  class="control-point control-point-br"
                  @mousedown.stop="startResize('br', $event)"
                ></div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" style="height: 100%">
        <el-card
          class="h100"
          shadow="never"
          :body-style="{ padding: '10px ', height: '100%' }"
        >
          <div class="components-library">
            <!-- 导出按钮和操作按钮 -->
            <div class="export-header">
              <h3 class="components-title">组件库</h3>
              <div class="action-buttons">
                <el-button
                  type="info"
                  size="small"
                  @click="undo"
                  :icon="RefreshLeft"
                  title="撤销 (Ctrl+Z)"
                  :disabled="isUndoDisabled"
                >
                  撤销
                </el-button>

                <el-button
                  type="primary"
                  size="small"
                  @click="fileDown"
                  :icon="Download"
                  title="导出设计为图片"
                >
                  导出设计
                </el-button>
              </div>
            </div>
            <div class="components-list">
              <!-- 文字组件 -->
              <div
                v-for="component in components"
                :key="component.type"
                class="component-item"
                draggable="true"
                @dragstart="handleDragStart(component)"
                @dragend="handleDragEnd"
              >
                <div class="component-icon">
                  <el-icon><component :is="component.icon" /></el-icon>
                </div>
                <div class="component-name">{{ component.name }}</div>
              </div>
            </div>

            <!-- 属性面板 - 优化显眼度 -->
            <div v-if="selectedElement" class="properties-panel">
              <div class="properties-header">
                <h3 class="properties-title">
                  <el-icon><Star /></el-icon>
                  属性设置
                </h3>
                <el-tag type="primary" size="small"
                  >当前选中:
                  {{
                    selectedElement.type === 'text'
                      ? '文字'
                      : selectedElement.type === 'title'
                      ? '标题'
                      : selectedElement.type === 'subtitle'
                      ? '副标题'
                      : '图片'
                  }}</el-tag
                >
              </div>

              <div class="properties-content compact-layout">
                <!-- 基本属性 -->
                <el-form label-width="70px" size="small" class="compact-form">
                  <!-- 文字元素属性 -->
                  <div v-if="selectedElement.type !== 'image'">
                    <el-form-item label="文字内容">
                      <el-input
                        v-model="selectedElement.text"
                        @input="updateElement"
                        placeholder="请输入文字内容"
                        clearable
                        size="small"
                      />
                    </el-form-item>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item label="字体大小">
                          <el-input-number
                            v-model="selectedElement.fontSize"
                            :min="12"
                            :max="200"
                            @change="updateElement"
                            controls-position="right"
                            size="small"
                            style="width: 100%"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="字体颜色">
                          <el-color-picker
                            v-model="selectedElement.color"
                            @change="updateElement"
                            show-alpha
                            :predefine="predefineColors"
                            size="small"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item label="字体粗细">
                          <el-select
                            v-model="selectedElement.fontWeight"
                            @change="updateElement"
                            placeholder="粗细"
                            size="small"
                            style="width: 100%"
                          >
                            <el-option label="正常" value="normal" />
                            <el-option label="加粗" value="bold" />
                            <el-option label="更粗" value="bolder" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="对齐方式">
                          <el-select
                            v-model="selectedElement.textAlign"
                            @change="updateElement"
                            placeholder="对齐"
                            size="small"
                            style="width: 100%"
                          >
                            <el-option label="左对齐" value="left" />
                            <el-option label="居中" value="center" />
                            <el-option label="右对齐" value="right" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>

                  <!-- 图片元素属性 -->
                  <div v-else>
                    <el-form-item label="图片选择">
                      <el-select
                        v-model="selectedElement.imageUrl"
                        @change="updateElement"
                        placeholder="选择Logo"
                        size="small"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="option in logoOptions"
                          :key="option.value"
                          :label="option.label"
                          :value="option.value"
                        />
                      </el-select>
                    </el-form-item>

                    <el-form-item label="填充方式">
                      <el-select
                        v-model="selectedElement.objectFit"
                        @change="updateElement"
                        placeholder="选择填充方式"
                        size="small"
                        style="width: 100%"
                      >
                        <el-option label="保持比例填充" value="contain" />
                        <el-option label="拉伸填充" value="fill" />
                        <el-option label="覆盖填充" value="cover" />
                        <el-option label="保持原尺寸" value="none" />
                      </el-select>
                    </el-form-item>
                  </div>
                </el-form>

                <!-- 位置尺寸 -->
                <div class="section-title">位置尺寸</div>
                <el-form label-width="70px" size="small" class="compact-form">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="X轴">
                        <el-input-number
                          v-model="selectedElement.x"
                          :min="0"
                          :max="canvasWidth"
                          @change="updateElement"
                          controls-position="right"
                          size="small"
                          style="width: 100%"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="Y轴">
                        <el-input-number
                          v-model="selectedElement.y"
                          :min="0"
                          :max="canvasHeight"
                          @change="updateElement"
                          controls-position="right"
                          size="small"
                          style="width: 100%"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="宽度">
                        <el-input-number
                          v-model="selectedElement.width"
                          :min="50"
                          :max="canvasWidth"
                          @change="updateElement"
                          controls-position="right"
                          size="small"
                          style="width: 100%"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="高度">
                        <el-input-number
                          v-model="selectedElement.height"
                          :min="20"
                          :max="canvasHeight"
                          @change="updateElement"
                          controls-position="right"
                          size="small"
                          style="width: 100%"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>

                <!-- 危险操作 -->
                <div class="danger-section">
                  <div class="section-title">危险操作</div>
                  <div class="danger-actions">
                    <el-button
                      type="danger"
                      size="small"
                      @click="deleteElement"
                      :icon="Delete"
                      style="width: 100%"
                    >
                      删除元素
                    </el-button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 未选中元素时的提示 -->
            <div v-else class="no-selection-panel">
              <div class="no-selection-content">
                <el-icon class="no-selection-icon"><InfoFilled /></el-icon>
                <h3>未选中任何元素</h3>
                <p>请在画布上点击选择元素进行编辑</p>
                <p class="hint">提示：从左侧组件库拖拽文字组件到画布上</p>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
/**
 * 自定义拖拽海报设计界面
 */
import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
  computed,
  watch,
  nextTick
} from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  Edit,
  Star,
  Promotion,
  Delete,
  Warning,
  InfoFilled,
  Download,
  Picture,
  RefreshLeft,
  RefreshRight
} from '@element-plus/icons-vue';
import html2canvas from 'html2canvas';

// 画布尺寸
const canvasWidth = 1920;
const canvasHeight = 1080;

// 全局默认设置
const defaultFontSize = 90;
const defaultColor = '#ffdd98';
import Logo1Img from '@/assets/img/logo1.png';
import LogoImg from '@/assets/img/logo2.png';
import Logo3Img from '@/assets/img/pcbonline.png';
import Logo4Img from '@/assets/img/logo4.png';
import Logo5Img from '@/assets/58dfa9036154638a6b3bf748713eb8b1.png';

// Logo图片选项
const logoOptions = [
  { value: Logo1Img, label: 'SCSPCBA 白底' },
  { value: LogoImg, label: 'SUCCESS 白底' },
  { value: Logo3Img, label: 'pcbonline 白底' },
  { value: Logo4Img, label: '旭森制造' },
  { value: Logo5Img, label: 'CREATURE' }
];

// 组件库数据（精简版）
const components = [
  { type: 'text', name: '文字', icon: 'Edit' },
  { type: 'title', name: '标题', icon: 'Star' },
  { type: 'subtitle', name: '副标题', icon: 'Promotion' },
  { type: 'image', name: '图片', icon: 'Picture' }
];

// 元素数据
const elements = ref([]);
const selectedElementId = ref(null);
const draggingComponent = ref(null);
const isDragging = ref(false);
const isResizing = ref(false);
const resizeDirection = ref('');
const dragStartPos = ref({ x: 0, y: 0 });
const elementStartPos = ref({ x: 0, y: 0 });
const elementStartSize = ref({ width: 0, height: 0 });
// 拖拽清理函数引用
const currentDragCleanup = ref(null);

// 历史记录
const history = ref([]);
const historyIndex = ref(-1);

// 缩放相关
const leftBox = ref(null);
const canvasScale = ref(1);

// 预定义颜色
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  '#000000',
  '#333333',
  '#666666',
  '#999999',
  '#ffffff'
]);

// 计算选中的元素
const selectedElement = computed(() => {
  return elements.value.find(el => el.id === selectedElementId.value);
});

// 计算撤销按钮是否禁用
const isUndoDisabled = computed(() => {
  return !history.value || historyIndex.value <= 0;
});

// 计算重做按钮是否禁用
const isRedoDisabled = computed(() => {
  return !history.value || historyIndex.value >= history.value.length - 1;
});

let headerStyle = ref({
  transform: '',
  'transform-origin': ' 0 0',
  'font-family': 'AlibabaPuHuiTi-Heavy'
});
let init = () => {
  let box = leftBox.value.$el;
  let width = box.offsetWidth;
  let scale = width / 1920;
  headerStyle.value.transform = `scale(${scale})`;
};

// 保存历史记录
const saveHistory = () => {
  // 只保留最近50条历史记录
  if (historyIndex.value < history.value.length - 1) {
    history.value = history.value.slice(0, historyIndex.value + 1);
  }
  history.value.push(JSON.parse(JSON.stringify(elements.value)));
  historyIndex.value++;

  if (history.value.length > 50) {
    history.value.shift();
    historyIndex.value--;
  }
};

// 撤销
const undo = () => {
  if (historyIndex.value > 0) {
    historyIndex.value--;
    elements.value = JSON.parse(
      JSON.stringify(history.value[historyIndex.value])
    );
  }
};

// 重做
const redo = () => {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++;
    elements.value = JSON.parse(
      JSON.stringify(history.value[historyIndex.value])
    );
  }
};

// 生成唯一ID
const generateId = () => {
  return (
    'element_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  );
};

// 处理拖拽开始
const handleDragStart = component => {
  draggingComponent.value = component;
  isDragging.value = true;
};

// 处理拖拽结束
const handleDragEnd = () => {
  isDragging.value = false;
  draggingComponent.value = null;
};

// 处理拖拽经过
const handleDragOver = e => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
};

// 处理放置（考虑缩放）
const handleDrop = e => {
  e.preventDefault();

  if (!draggingComponent.value) return;

  const canvas = document.getElementById('designCanvas');
  const rect = canvas.getBoundingClientRect();

  // 计算相对于画布的位置（考虑缩放）
  const x = (e.clientX - rect.left) / canvasScale.value;
  const y = (e.clientY - rect.top) / canvasScale.value;

  // 根据组件类型设置默认尺寸
  let defaultWidth = 200;
  let defaultHeight = 50;
  let elementFontSize = defaultFontSize; // 使用全局默认字体大小
  let elementColor = defaultColor; // 使用全局默认字体颜色
  let defaultImageUrl = logoOptions[0].value; // 默认使用第一个Logo

  if (draggingComponent.value.type === 'title') {
    defaultWidth = 400;
    defaultHeight = 80;
  } else if (draggingComponent.value.type === 'subtitle') {
    defaultWidth = 300;
    defaultHeight = 60;
  } else if (draggingComponent.value.type === 'image') {
    defaultWidth = 200;
    defaultHeight = 200; // 图片默认宽高200x200
  }

  // 计算放置位置，确保在画布内
  let newX = Math.max(0, x - defaultWidth / 2);
  let newY = Math.max(0, y - defaultHeight / 2);

  // 确保不会超出画布右边界和下边界
  newX = Math.min(newX, canvasWidth - defaultWidth);
  newY = Math.min(newY, canvasHeight - defaultHeight);

  // 确保元素不会放置在容器可见区域外（考虑缩放）
  if (canvasScale.value < 1) {
    // 计算容器可见区域（考虑缩放）
    const containerVisibleWidth = canvasWidth * canvasScale.value;
    const containerVisibleHeight = canvasHeight * canvasScale.value;

    // 元素的右边界不能超过可见区域的右边界
    const maxVisibleX =
      containerVisibleWidth / canvasScale.value - defaultWidth;
    newX = Math.min(newX, maxVisibleX);

    // 元素的下边界不能超过可见区域的下边界
    const maxVisibleY =
      containerVisibleHeight / canvasScale.value - defaultHeight;
    newY = Math.min(newY, maxVisibleY);
  }

  // 创建新元素
  const newElement = {
    id: generateId(),
    type: draggingComponent.value.type,
    x: newX,
    y: newY,
    width: defaultWidth,
    height: defaultHeight,
    zIndex: elements.value.length
  };

  // 根据元素类型设置特定属性
  if (draggingComponent.value.type === 'image') {
    newElement.imageUrl = defaultImageUrl;
    newElement.objectFit = 'contain';
  } else {
    // 文字元素属性
    newElement.text = getDefaultText(draggingComponent.value.type);
    newElement.fontSize = elementFontSize;
    newElement.color = elementColor;
    newElement.fontWeight =
      draggingComponent.value.type === 'title' ? 'bold' : 'normal';
    newElement.textAlign = 'center';
    newElement.backgroundColor = 'transparent';
    newElement.border = 'none';
    newElement.borderRadius = 0;
    newElement.opacity = 1;
  }

  elements.value.push(newElement);
  selectElement(newElement.id);
  saveHistory();

  draggingComponent.value = null;
};

// 窗口大小变化时重新计算缩放
const handleResize = () => {};

// 获取默认文本
const getDefaultText = type => {
  switch (type) {
    case 'text':
      return '请输入文本';
    case 'title':
      return '标题';
    case 'subtitle':
      return '副标题';
    case 'image':
      return ''; // 图片不需要文本
    default:
      return '内容';
  }
};

// 开始拖拽元素（考虑缩放）
const startDragElement = (element, e) => {
  if (isResizing.value) return;

  // 立即选中元素
  selectElement(element.id);

  const canvas = document.getElementById('designCanvas');
  const rect = canvas.getBoundingClientRect();

  // 考虑缩放
  dragStartPos.value = {
    x: (e.clientX - rect.left) / canvasScale.value,
    y: (e.clientY - rect.top) / canvasScale.value
  };

  elementStartPos.value = {
    x: element.x,
    y: element.y
  };

  // 使用 requestAnimationFrame 优化性能
  const handleMouseMove = e => {
    requestAnimationFrame(() => handleElementDrag(e));
  };

  // 保存事件处理器以便移除
  const mouseMoveHandler = handleMouseMove;
  const mouseUpHandler = stopElementDrag;

  document.addEventListener('mousemove', mouseMoveHandler, { passive: true });
  document.addEventListener('mouseup', mouseUpHandler, { passive: true });

  // 清理函数
  const cleanup = () => {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    // 保存到清理函数引用中
    currentDragCleanup.value = null;
  };

  // 保存清理函数
  currentDragCleanup.value = cleanup;

  e.preventDefault();
  e.stopPropagation();
};

// 处理元素拖拽（考虑缩放）
const handleElementDrag = e => {
  // 使用更快的算法
  const element = elements.value.find(el => el.id === selectedElementId.value);
  if (!element) return;

  const canvas = document.getElementById('designCanvas');
  const rect = canvas.getBoundingClientRect();

  // 考虑缩放 - 使用缓存的计算
  const scale = canvasScale.value;
  const currentX = (e.clientX - rect.left) / scale;
  const currentY = (e.clientY - rect.top) / scale;

  const deltaX = currentX - dragStartPos.value.x;
  const deltaY = currentY - dragStartPos.value.y;

  // 计算元素的新位置
  let newX = elementStartPos.value.x + deltaX;
  let newY = elementStartPos.value.y + deltaY;

  // 确保元素不会超出画布边界（1920×1080）
  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;

  const maxX = canvasWidth - element.width;
  const maxY = canvasHeight - element.height;
  if (newX > maxX) newX = maxX;
  if (newY > maxY) newY = maxY;

  // 确保元素不会拖拽到容器可见区域外（只在缩放时）
  if (scale < 1) {
    // 计算容器可见区域（考虑缩放）
    const maxVisibleX = (canvasWidth * scale) / scale - element.width;
    const maxVisibleY = (canvasHeight * scale) / scale - element.height;

    if (newX > maxVisibleX) newX = maxVisibleX;
    if (newY > maxVisibleY) newY = maxVisibleY;
  }

  // 直接更新元素位置
  element.x = newX;
  element.y = newY;
};

// 停止元素拖拽
const stopElementDrag = () => {
  // 执行清理函数
  if (currentDragCleanup.value) {
    currentDragCleanup.value();
  }
  saveHistory();
};

// 开始调整大小（考虑缩放）
const startResize = (direction, e) => {
  isResizing.value = true;
  resizeDirection.value = direction;

  const element = elements.value.find(el => el.id === selectedElementId.value);
  if (!element) return;

  const canvas = document.getElementById('designCanvas');
  const rect = canvas.getBoundingClientRect();

  // 考虑缩放
  dragStartPos.value = {
    x: (e.clientX - rect.left) / canvasScale.value,
    y: (e.clientY - rect.top) / canvasScale.value
  };

  elementStartPos.value = {
    x: element.x,
    y: element.y
  };

  elementStartSize.value = {
    width: element.width,
    height: element.height
  };

  document.addEventListener('mousemove', handleElementResize);
  document.addEventListener('mouseup', stopResize);

  e.preventDefault();
  e.stopPropagation();
};

// 处理元素调整大小（考虑缩放）
const handleElementResize = e => {
  const canvas = document.getElementById('designCanvas');
  const rect = canvas.getBoundingClientRect();

  // 考虑缩放
  const currentX = (e.clientX - rect.left) / canvasScale.value;
  const currentY = (e.clientY - rect.top) / canvasScale.value;

  const deltaX = currentX - dragStartPos.value.x;
  const deltaY = currentY - dragStartPos.value.y;

  const element = elements.value.find(el => el.id === selectedElementId.value);
  if (!element) return;

  let newX = element.x;
  let newY = element.y;
  let newWidth = element.width;
  let newHeight = element.height;

  switch (resizeDirection.value) {
    case 'tl': // 左上
      newX = Math.max(0, elementStartPos.value.x + deltaX);
      newY = Math.max(0, elementStartPos.value.y + deltaY);
      newWidth = Math.max(50, elementStartSize.value.width - deltaX);
      newHeight = Math.max(20, elementStartSize.value.height - deltaY);
      break;
    case 'tr': // 右上
      newY = Math.max(0, elementStartPos.value.y + deltaY);
      newWidth = Math.max(50, elementStartSize.value.width + deltaX);
      newHeight = Math.max(20, elementStartSize.value.height - deltaY);
      break;
    case 'bl': // 左下
      newX = Math.max(0, elementStartPos.value.x + deltaX);
      newHeight = Math.max(20, elementStartSize.value.height + deltaY);
      newWidth = Math.max(50, elementStartSize.value.width - deltaX);
      break;
    case 'br': // 右下
      newWidth = Math.max(50, elementStartSize.value.width + deltaX);
      newHeight = Math.max(20, elementStartSize.value.height + deltaY);
      break;
  }

  // 限制在画布内
  newX = Math.min(Math.max(0, newX), canvasWidth - newWidth);
  newY = Math.min(Math.max(0, newY), canvasHeight - newHeight);
  newWidth = Math.min(Math.max(50, newWidth), canvasWidth - newX);
  newHeight = Math.min(Math.max(20, newHeight), canvasHeight - newY);

  // 确保元素不会调整到容器可见区域外（考虑缩放）
  if (canvasScale.value < 1) {
    // 计算容器可见区域（考虑缩放）
    const containerVisibleWidth = canvasWidth * canvasScale.value;
    const containerVisibleHeight = canvasHeight * canvasScale.value;

    // 元素的右边界不能超过可见区域的右边界
    const maxVisibleX = containerVisibleWidth / canvasScale.value - newWidth;
    newX = Math.min(newX, maxVisibleX);

    // 元素的下边界不能超过可见区域的下边界
    const maxVisibleY = containerVisibleHeight / canvasScale.value - newHeight;
    newY = Math.min(newY, maxVisibleY);

    // 重新计算宽度和高度，确保在可见区域内
    newWidth = Math.min(
      newWidth,
      containerVisibleWidth / canvasScale.value - newX
    );
    newHeight = Math.min(
      newHeight,
      containerVisibleHeight / canvasScale.value - newY
    );
  }

  element.x = newX;
  element.y = newY;
  element.width = newWidth;
  element.height = newHeight;
};

// 停止调整大小
const stopResize = () => {
  isResizing.value = false;
  resizeDirection.value = '';
  document.removeEventListener('mousemove', handleElementResize);
  document.removeEventListener('mouseup', stopResize);
  saveHistory();
};

// 选择元素
const selectElement = id => {
  selectedElementId.value = id;
};
let fileDown = async () => {
  // 确保所有图片都加载完成
  const images = Array.from(document.querySelectorAll('#designCanvas img'));
  await Promise.all(
    images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve; // 即使加载失败也继续
      });
    })
  );

  let element = document.querySelector('#designCanvas');
  
  html2canvas(element, {
    onclone: function (documentClone) {
      const cloneCanvas = documentClone.getElementById('designCanvas');
      cloneCanvas.style.transform = 'scale(1)';
    },
    scale: window.devicePixelRatio * 3,
    useCORS: true, // 允许跨域图片
    backgroundColor: null // 透明背景
  }).then(canvas => {
    canvas.toBlob(blob => {
      let a = document.createElement('a');
      a.style.display = 'none';
      const link = window.URL.createObjectURL(blob);
      a.href = link;
      a.download = '欢迎大屏_' + new Date().getTime();
      a.click();
      a = null;
      setTimeout(() => {
        URL.revokeObjectURL(link);
      }, 1000);
    });
  }).catch(error => {
    console.error('导出图片失败:', error);
    ElMessage.error('导出失败，请重试');
  });
};
// 处理画布点击
const handleCanvasClick = e => {
  // 如果点击的是画布空白区域，取消选择
  if (
    e.target.id === 'designCanvas' ||
    e.target.classList.contains('canvas-background')
  ) {
    selectedElementId.value = null;
  }
};

// 获取元素样式（考虑缩放）
const getElementStyle = element => {
  return {
    left: `${element.x}px`,
    top: `${element.y}px`,
    width: `${element.width}px`,
    height: `${element.height}px`,
    position: 'absolute',
    cursor: 'move',
    zIndex: element.zIndex,
    // 使用 will-change 和 transform 提升性能
    willChange: 'transform',
    transform: 'translateZ(0)',
    // 使用硬件加速
    backfaceVisibility: 'hidden',
    perspective: 1000
  };
};

// 获取元素内容样式
const getElementContentStyle = element => {
  return {
    fontSize: `${element.fontSize}px`,
    color: element.color,
    fontWeight: element.fontWeight,
    textAlign: element.textAlign,
    backgroundColor: element.backgroundColor,
    border: element.border,
    borderRadius: `${element.borderRadius}px`,
    opacity: element.opacity,
    padding: '10px',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    wordBreak: 'break-all',
    display: 'flex',
    alignItems: 'center',
    justifyContent: element.textAlign,
    lineHeight: 1.5
  };
};

// 获取图片元素样式
const getImageElementStyle = element => {
  return {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  };
};

// 获取图片样式
const getImageStyle = element => {
  return {
    objectFit: element.objectFit || 'contain',
    maxWidth: '100%',
    maxHeight: '100%'
  };
};

// 更新元素
const updateElement = () => {
  saveHistory();
};

// 删除元素
const deleteElement = () => {
  if (!selectedElementId.value) return;

  ElMessageBox.confirm('确定删除这个元素吗？', '提示', {
    type: 'warning'
  })
    .then(() => {
      const index = elements.value.findIndex(
        el => el.id === selectedElementId.value
      );
      if (index > -1) {
        elements.value.splice(index, 1);
        selectedElementId.value = null;
        saveHistory();
        ElMessage.success('删除成功');
      }
    })
    .catch(() => {});
};

// 保存画布
const saveCanvas = () => {};

// 清空画布
const clearCanvas = () => {
  ElMessageBox.confirm('确定清空整个画布吗？', '警告', {
    type: 'warning'
  })
    .then(() => {
      elements.value = [];
      selectedElementId.value = null;
      saveHistory();
      ElMessage.success('画布已清空');
    })
    .catch(() => {});
};

// 添加示例元素
const addSampleElements = () => {
  elements.value = [
    {
      id: generateId(),
      type: 'image',
      x: 40,
      y: 35,
      width: 322,
      height: 124,
      imageUrl: logoOptions[0].value,
      objectFit: 'contain',
      zIndex: 1
    },
    {
      id: generateId(),
      type: 'title',
      text: '欢迎使用海报编辑器',
      x: 530,
      y: 220,
      width: 845,
      height: 134,
      fontSize: defaultFontSize,
      color: defaultColor,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: 0,
      opacity: 1,
      zIndex: 2
    },
    {
      id: generateId(),
      type: 'text',
      text: '拖拽左侧组件到画布上开始设计',
      x: 324,
      y: 413,
      width: 1310,
      height: 150,
      fontSize: defaultFontSize,
      color: defaultColor,
      fontWeight: 'normal',
      textAlign: 'center',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: 0,
      opacity: 1,
      zIndex: 3
    }
  ];
};

// 键盘快捷键处理
const handleKeyDown = e => {
  // Ctrl+Z: 撤销
  if (e.ctrlKey && e.key === 'z') {
    e.preventDefault();
    undo();
  }
  // Ctrl+Y: 重做
  if (e.ctrlKey && e.key === 'y') {
    e.preventDefault();
    redo();
  }
};

// 初始化
onMounted(() => {
  addSampleElements();
  window.onresize = () => {
    init();
  };
  init();
  // 初始化缩放
  nextTick(() => {
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
  });

  // 添加键盘事件监听
  document.addEventListener('keydown', handleKeyDown);

  // 添加初始历史记录
  saveHistory();
});

// 组件卸载前清理
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('keydown', handleKeyDown);
});
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

.canvas-toolbar {
  padding: 10px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  gap: 10px;
  flex-shrink: 0;
  align-items: center;

  .el-button {
    font-size: 12px;
    padding: 6px 12px;
  }
}

// 设计画布（完全参考 addPoster.vue 的 #viewBox）
#designCanvas {
  background-image: url('@/assets/design/design_bg.png');
  background-size: 100% 100%;
  width: 1920px;
  height: 1080px;
  position: relative;
}

// 画布元素
.canvas-element {
  position: absolute;
  cursor: move;
  // 禁用过渡动画，提升拖拽响应速度
  // transition: box-shadow 0.2s, transform 0.1s;

  // 使用will-change提升性能
  will-change: transform, left, top;
  // 启用GPU加速
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;

  &:hover {
    box-shadow: 0 0 0 1px #409eff;
  }

  &.selected {
    box-shadow: 0 0 0 2px #409eff;
    z-index: 1000 !important;
  }
}

.element-content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.image-element {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: transparent;

  img {
    display: block;
    object-fit: contain; /* 确保图片保持比例 */
  }
}

// 控制点
.element-controls {
  position: absolute;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
  pointer-events: none;
}

.control-point {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #409eff;
  border: 2px solid #fff;
  border-radius: 50%;
  pointer-events: all;
  cursor: se-resize;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);

  &.control-point-tl {
    top: -5px;
    left: -5px;
    cursor: nw-resize;
  }

  &.control-point-tr {
    top: -5px;
    right: -5px;
    cursor: ne-resize;
  }

  &.control-point-bl {
    bottom: -5px;
    left: -5px;
    cursor: sw-resize;
  }

  &.control-point-br {
    bottom: -5px;
    right: -5px;
    cursor: se-resize;
  }
}

// 组件库
.components-library {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.export-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e9ecef;

  .components-title {
    margin: 0;
    font-size: 16px;
    color: #333;
    font-weight: 600;
  }

  .action-buttons {
    display: flex;
    gap: 6px;
    align-items: center;

    .el-button {
      font-size: 11px;
      padding: 4px 8px;
      height: 26px;
      min-width: 50px;

      &.is-disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}

.components-list {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 5px;
}

.component-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #dee2e6;
  border-radius: 8px;
  cursor: move;
  transition: all 0.3s ease;
  user-select: none;

  &:hover {
    background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
    border-color: #409eff;
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
  }

  &:active {
    background: linear-gradient(135deg, #dee2e6 0%, #ced4da 100%);
    transform: translateY(0) scale(0.98);
  }
}

.component-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 8px;
  margin-right: 12px;
  color: #409eff;
  font-size: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.component-name {
  font-size: 14px;
  color: #333;
  font-weight: 600;
}

// 属性面板 - 优化显眼度
.properties-panel {
  border-top: 2px solid #409eff;
  padding-top: 12px;
  max-height: 70vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 6px;
  margin-top: 10px;
}

.properties-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 0 10px;
}

.properties-title {
  margin: 0;
  font-size: 16px;
  color: #409eff;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;

  .el-icon {
    font-size: 18px;
  }
}

.properties-content {
  padding: 0 10px 12px;

  &.compact-layout {
    .compact-form {
      .el-form-item {
        margin-bottom: 10px;

        .el-form-item__label {
          font-size: 12px;
          padding-right: 8px;
          line-height: 28px;
        }

        .el-input,
        .el-select,
        .el-input-number {
          .el-input__wrapper {
            padding: 0 10px;
            height: 28px;
          }
        }

        .el-color-picker {
          .el-color-picker__trigger {
            width: 28px;
            height: 28px;
          }
        }
      }
    }

    .section-title {
      font-size: 13px;
      font-weight: 600;
      color: #333;
      margin: 12px 0 8px 0;
      padding-bottom: 6px;
      border-bottom: 1px solid #f0f0f0;

      &::before {
        content: '';
        display: inline-block;
        width: 3px;
        height: 12px;
        background: #409eff;
        margin-right: 6px;
        border-radius: 2px;
      }
    }

    .danger-section {
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid #f0f0f0;

      .danger-actions {
        margin-top: 8px;
      }
    }
  }
}

.properties-card {
  margin-bottom: 15px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    border-color: #409eff;
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.1);
  }

  &.danger-card {
    border-color: #f56c6c;

    &:hover {
      border-color: #f56c6c;
      box-shadow: 0 4px 12px rgba(245, 108, 108, 0.1);
    }
  }
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 14px;
    background: #409eff;
    margin-right: 8px;
    border-radius: 2px;
  }
}

.danger-card .section-title::before {
  background: #f56c6c;
}

.highlight-item {
  .el-form-item__label {
    font-weight: 600;
    color: #333;
  }

  .el-input,
  .el-input-number,
  .el-color-picker {
    border-color: #409eff;

    &:hover {
      border-color: #79bbff;
    }
  }
}

.font-size-control {
  display: flex;
  align-items: center;
  gap: 8px;

  .el-input-number {
    flex: 1;
  }

  .font-size-unit {
    color: #666;
    font-size: 12px;
    min-width: 24px;
  }
}

.danger-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;

  .el-button {
    flex: 1;
  }

  .danger-hint {
    color: #f56c6c;
    font-size: 18px;
    margin-left: 10px;
    cursor: help;
  }
}

// 未选中元素时的提示
.no-selection-panel {
  border-top: 2px solid #e9ecef;
  padding-top: 20px;
  max-height: 70vh;
  overflow-y: auto;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.no-selection-content {
  text-align: center;
  padding: 30px;
  color: #666;

  .no-selection-icon {
    font-size: 48px;
    color: #c0c4cc;
    margin-bottom: 20px;
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #333;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
  }

  .hint {
    color: #409eff;
    font-weight: 500;
    margin-top: 15px;
    font-size: 13px;
  }
}

// 滚动条样式
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;

  &:hover {
    background: #a8a8a8;
  }
}

.h100 {
  height: 100%;
}

#designCanvas {
  background-image: url('@/assets/design/design_bg.png');
  background-size: 100% 100%;
  width: 1920px;
  height: 1080px;
  position: relative;
}
</style>
