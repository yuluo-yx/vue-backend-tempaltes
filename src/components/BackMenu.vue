<template>
    <div class="back">
    <el-icon @click="toIndex"><Back /></el-icon>
    &nbsp;
    <span>个人中心</span>
  </div>
</template>

<script setup lang="ts">
import { Back } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
let router = useRouter();

const toIndex = () => {
  router.push("/index");
};
</script>

<style lang="scss" scoped>
.back {
  width: auto;
  height: auto;

  .el-icon {
    vertical-align: middle;
    font-weight: 700;
    font-size: 20px;
  }

  span {
    display: inline-block;
    vertical-align: middle;
    line-height: 10px;
    color: rgb(60, 141, 188);
  }
}
</style>
