<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>

<script setup>
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
function isExternal(path) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path)
  return isExternal
}

let props = defineProps({
  to: {
    type: String,
    required: true
  }
})
const router = useRouter()
const push = () => {
  if (props.to == '/dashboard') {
    const href = router.resolve({
      path: props.to
    }).href
    // 替换默认的 window.open

    // const newWindow = window.open('', '_blank', 'width=800,height=600')
    // newWindow.location.href = href
    window.open(href, '_blank') //打开新的页面 到 href 这个页面
  } else {
    router.push(props.to).catch((err) => {
      console.log(err)
    })
  }
}
</script>
