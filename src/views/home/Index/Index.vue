<template>
  <div class="index">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>欢迎使用XOJ</span>
          <hr />
        </div>
        <el-image :src="src" />
      </template>
    </el-card>

    <div class="card-function">
      <div class="explain">
        <div class="box-card1">
          <el-card>
            <template #header>
              <div class="card-header1">
                <span>系统设置</span>
              </div>
              <hr />
              <div class="list">
                <el-switch
                  v-model="theme"
                  active-text="light主题"
                  inactive-text="dark主题"
                  @click="toggle()"
                >
                </el-switch>
                <br />
                <br />
                <el-switch
                  v-model="language"
                  active-text="中文"
                  inactive-text="英文"
                  @click="lang()"
                >
                </el-switch>
              </div>
            </template>
          </el-card>
        </div>

        <div class="box-card1">
          <el-card>
            <template #header>
              <div class="card-header3">
                <span>用户设置</span>
              </div>
              <hr />
              <div class="user-list">
                <el-link type="primary" @click="toSysUserPage">个人中心</el-link>
                <br />
                <br />
                <el-link type="primary" @click="dialogVisible = true">退出登录</el-link>
              </div>
            </template>
          </el-card>
        </div>

        <div class="box-card2">
          <el-card>
            <template #header>
              <div class="card-header1">
                <span>技术选型</span>
              </div>
              <hr />
              <ol class="ol-list">
                <div v-for="value in data" :key="value">
                  <li v-for="(val, key, index) in value" :key="index">
                    {{ key }}：{{ val }}
                  </li>
                </div>
              </ol>
            </template>
          </el-card>
        </div>
      </div>
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
import { reactive, ref } from "vue";
import { useToggle } from "@vueuse/shared";
import { useDark } from "@vueuse/core";
import * as loginApi from "../../../api/login/login.js";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

let router = useRouter()

const src =
  "https://hdoi.cn/api/public/img/2c514ebdec274854ac5e914e0bfb997b.jpg";

// 数据展示
const data = reactive([
  { 核心框架: "spring boot" },
  { token验证: "jwt" },
  { 持久层框架: "mybatis-plus" },
  { 数据库连接池: "Druid" },
  { 前端框架: "vue3" },
  { ui框架: "element-plus" },
]);

// 主题切换
const theme = ref<boolean>(false);
const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: "useDarkKEY",
  // 暗黑class名字
  valueDark: "dark",
  // 高亮class名字
  valueLight: "light",
});

const toggle = useToggle(isDark);

// 语言切换
const language = ref<boolean>(false);

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

const toSysUserPage = () => {
  router.replace("/sysuser")
}
</script>
 
<style lang="scss" scoped>
.user-list {
  text-align: center;
}

.list {
  text-align: center;
}

.ol-list {
  margin-left: 30px;
  font-size: 17px;
}

.index {
  display: flex;
  justify-content: space-around;
}

.card {
  display: flex;
  width: 84vw;
  height: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: stretch;
}

.card-header1 {
  font-size: 18px;
  color: rgb(64, 158, 255);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    width: 60vw;
    color: rgb(64, 158, 255);
    text-align: center;
    line-height: 10vh;
    font-size: 18px;
    font-weight: 700;
  }
}

.item {
  margin-bottom: 18px;
}

.card-function {
  display: flex;
  width: 20vw;
  height: 85.8vh;
  justify-content: center;
  margin-bottom: 5px;
}

.box-card1 {
  width: 20vw;
  height: 30.5vh;
}

.box-card2 {
  margin-top: -15px;
  width: 20vw;
  height: 30vh;
}

.box-card3 {
  width: 20vw;
  height: 30vh;
}

.box-card {
  width: 60vw;
  height: 85.8vh;
}

.demo {
  height: 100%;
  width: 100%;
}
</style>