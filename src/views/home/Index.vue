<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <LeftMenu />
      </el-aside>
      <el-container>
        <el-header>
            <RightMenu />
        </el-header>
        <el-main>
            <!-- 子界面路由入口 -->
            <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LeftMenu from "../../components/LeftMenu.vue";
import RightMenu from "../../components/RightMenu.vue";

</script>

<style labg="scss">
.el-aside {
  background-color: rgb(15, 41, 80);
}
.el-header {
  background-color: rgb(60, 141, 188);
}
.el-main {
  background-color: rgb(250, 250, 250);
}

.el-aside,
.el-container,
.common-layout,
#app,
body,
html {
  height: 100%;
}
</style>