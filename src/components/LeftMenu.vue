<template>
  <el-menu
    :collapse="!$store.state.HomeModule.navBool"
    default-active="2"
    class="el-menu-vertical-demo"
    router
    @open="handleOpen"
    @close="handleClose"
  >
    <el-col>
      <div class="card">
        <div class="avatar">
          <el-avatar :src="defaultAvatar" />
        </div>
        <div class="card1" v-show="$store.state.HomeModule.navBool">
          <p class="username">Admin</p>
          <div class="function">
            <div class="online"></div>
            &nbsp;
            <el-link>在线</el-link>
            &nbsp;&nbsp;
            <div class="icon">
              <el-icon><Position /></el-icon>
            </div>
            &nbsp;
            <el-link type="danger" @click="dialogVisible = true">注销</el-link>
          </div>
        </div>
      </div>
    </el-col>
    <template
      v-for="value in router.options.routes[1].children"
      :key="value.path"
    >
      <!-- 带下拉的导航 -->
      <el-sub-menu :index="value.path" v-show="value.meta.isShow == true" v-if="value.children">
        <template #title>
          <el-icon>
            <!-- 可以放入路由信息中 -->
            <!-- <el-icon><TrendCharts /></el-icon> -->
            <!-- 使用动态组件的方式渲染 -->
            <component :is="value.meta.icon"></component>
          </el-icon>
          <span>{{ value.meta.title }}</span>
        </template>
        <el-menu-item-group v-for="val in value.children" :key="val.path">
          <el-menu-item v-show="value.meta.isShow == true" :index="val.path">{{ val.meta.title }}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <!-- 不带下拉的导航 -->
      <el-menu-item v-show="value.meta.isShow == true" :index="value.path" v-else>
        <el-icon style="color: rgb(141, 157, 186)">
          <component :is="value.meta.icon"></component>
        </el-icon>
        <span v-show="value.meta.isShow == true">{{ value.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>

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
import { Menu as IconMenu, Position } from "@element-plus/icons-vue";
import defaultAvatar from "../assets/blog.jpg";

import * as loginApi from "../api/login/login.js";
import { ElMessage } from "element-plus";
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();

let test = reactive({
  defaultAvatar: defaultAvatar,
});

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
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

onMounted(() => {
  // 动态获取路由规则
  // console.log(router.options.routes[1].children)
});

const show = ref<Boolean>(true)
</script>

<style lang="scss">
.dialog-footer button:first-child {
  margin-right: 10px;
}

.el-menu-vertical-demo {
  background-color: rgb(15, 41, 80);
  color: rgb(24, 144, 255);
}

.card {
  display: flex;
  width: auto;
  height: 8.3vh;
  border-bottom: 1px solid rgb(201, 201, 202);
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  padding-top: 10px;
  padding-left: 11px;
}
.username {
  display: flex;
  width: 5vw;
  height: 5vh;
  justify-content: space-around;
  align-items: center;
}
.card1 {
  display: flex;
  width: 8vw;
  height: 4vh;
  flex-direction: column;
  align-items: center;
  p {
    text-align: center;
    color: rgb(64, 158, 255);
  }
}
.function {
  display: flex;
  width: 9vw;
  height: 4vh;
  justify-content: center;

  .el-link {
    font-weight: 700;
  }
}

.icon {
  display: flex;
  width: 1vw;
  height: 3vh;
  line-height: 3vh;
  align-items: center;
}

.online {
  margin-top: 3px;
  width: 1vw;
  height: 2vh;
  border-radius: 50%;
  background-color: rgb(64, 158, 255);
}

.el-menu-item span {
  color: rgb(141, 157, 186);
  font-weight: 700;
  font-size: 14px;
  font-family: "宋体";
}

.el-menu-item span:hover {
  color: rgb(24, 144, 255);
}
</style>