<template>
  <div>
    <el-icon>
      <!-- <CaretRight v-if="bool" /> -->
      <CaretRight @click="ck" v-if="store.state.HomeModule.navBool" />
      <CaretLeft @click="ck" v-else />
    </el-icon>
    <!-- @mouseover="openSelect" @mouseleave="shutSelect" -->
    <div class="user">
      <el-avatar :size="40" :src="defaultAvatar" />
      &nbsp;
      <p>Admin</p>
      <el-collapse-transition>
        <div v-show="showSelect" class="select">
          <!-- <p @click="toggleDark">{{ theme ? "白天模式" : "黑夜模式" }}</p>  -->
          <!-- <p @click="lang">语言</p>
          <p @click="dialogVisible = true">退出</p> -->
        </div>
      </el-collapse-transition>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="确定退出" width="30%">
    <span>确定退出系统吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">结束</el-button>
        <el-button type="primary" @click="logout">退出</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { CaretRight, CaretLeft } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import defaultAvatar from "../assets/blog.jpg";
import * as loginApi from "../api/login/login.js";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useToggle } from "@vueuse/shared";
import { useDark } from "@vueuse/core";

import { useStore } from "vuex";
let store = useStore();

let router = useRouter()

// 切换系统主题
let theme = ref<boolean>(true);

const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: "useDarkKEY",
  // 暗黑class名字
  valueDark: "dark",
  // 高亮class名字
  valueLight: "light",
});

const toggle = useToggle(isDark);

// 将此处的数据使用VueX来定义
// let bool = ref(true)
let ck = () => {
  // 切换bool的真假值，从而实现图标的显示
  // bool.value = !bool.value

  // 触发muation更改数据
  store.commit("SET_NAV_BOOL");
  //console.log(store.state.HomeModule.navBool);
};

// 用户点击用户头像和用户名的div，触发一个select选择器
let showSelect = ref(false);

const openSelect = () => {
  showSelect.value = true;
};

const shutSelect = () => {
  showSelect.value = false;
};

const dialogVisible = ref(false);

const logout = () => {
  dialogVisible.value = false;
  loginApi.logoutUser();
  router.push("/login");
  ElMessage({
    message: "登出成功",
    type: "success",
  });
};
</script>

<style lang="scss">
.el-header {
  background-color: rgb(64, 158, 255);
  line-height: 70px;
  .el-icon {
    font-size: 20px;
  }
}
.user {
  position: relative;
  float: right;
  margin-top: 5px;
  height: 6vh;
  p {
    float: right;
    display: block;
    color: rgb(255, 255, 255);
    text-align: center;
    margin-top: -12px;
    &:hover {
      cursor: pointer;
    }
  }
}

.select {
  width: 6.5vw;
  height: 9vh;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: -15px;
  background-color: rgb(247, 248, 250);
  p {
    // margin-top: 3px;
    // background-color: pink;
    display: block;
    width: 6.5vw;
    height: 5.8vh;
    text-align: center;
    font-size: 14px;
    color: black;
    line-height: 7vh;
    border-bottom: 1px solid #ccc;
    &:hover {
      cursor: pointer;
    }
  }
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>