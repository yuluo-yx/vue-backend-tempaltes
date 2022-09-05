<template>
  <div class="demo">
    <el-button type="primary">Primary</el-button>
    <div>首页</div>
    <span>切换主题</span>
    <el-switch
        inline-prompt
        v-model="theme"
        @click="toggle()"
    >
    </el-switch>
  </div>
</template>
 
<script lang="ts" setup>
import {ref} from "vue"
import { useToggle } from '@vueuse/shared'
import { useDark } from "@vueuse/core";
 
 
    const theme = ref<boolean>(false)
 
    const isDark = useDark({
      // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
      storageKey: 'useDarkKEY',
      // 暗黑class名字
      valueDark: 'dark',
      // 高亮class名字
      valueLight: 'light',
    })
 
    const toggle = useToggle(isDark);
 
</script>
 
<style>
.demo {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>