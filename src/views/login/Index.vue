<template>
  <div class="login">
    <div class="login-cur">
      <li>Login</li>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <!-- <el-icon><User /></el-icon> -->
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="ruleForm.username"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <!-- <el-icon><Lock /></el-icon> -->
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="loginbtnbool"
            class="login-btn"
            type="primary"
            @click="submitForm(ruleFormRef)"
            >登录
          </el-button>
          <el-button
            :disabled="resetbtnbool"
            class="reset-btn"
            @click="resetForm(ruleFormRef)"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import * as ck from "../../util/verfifcation.js";
import * as loginApi from "../../api/login/login.js";
import { useRouter } from "vue-router";

let router = useRouter();

const ruleFormRef = ref<FormInstance>();

const checkUser = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("用户名不能为空！！！"));
  } else if (ck.CkUsername(value)) {
    callback(new Error("用户名为4到12位 由字母、数字、下划线组成"));
  } else {
    callback();
  }
};

// 验证密码
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码！！！"));
  } else if (ck.CkPassword(value)) {
    callback(new Error("密码为6-15位的字母+数字"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  username: "",
  password: "",
});

// 登录按钮可用性检验
let loginbtnbool = ref(true);
// 数据监听
watch(ruleForm, (newValue, oldValue) => {
  // 登录时的处理
  if (newValue.username != "" && newValue.password != "") {
    loginbtnbool.value = false;
  } else {
    loginbtnbool.value = true;
  }
});

// 重置按钮可用性检验
let resetbtnbool = ref(true);
watch(ruleForm, (newValue, oldValue) => {
  if (newValue.username != "" || newValue.password != "") {
    resetbtnbool.value = false;
  } else {
    resetbtnbool.value = true;
  }
});

// 校验规则
const rules = reactive({
  username: [{ validator: checkUser, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
});

// 提交登录请求
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // console.log('登录!')
      loginApi
        .loginUser({ username: ruleForm.username, password: ruleForm.password })
        .then((result: any) => {
          console.log(result);

          if (result.status === 200) {
            if (result.data.code == 8291) {
              ElMessage.success("登录成功！");
              // LOcalStorage 存储jwt-token，以后每次访问都带着token进行鉴权
              localStorage.setItem("token", result.data.data);
              // 跳转到首页
              router.push("/home");
            } else {
              ElMessage.error(result.data.message);
            }
          } else {
            ElMessage.error("服务器异常，请稍后再试！");
          }
        })
        .catch((err: any) => {
          ElMessage.error("服务器异常，请稍后再试！");
        });
    } else {
    }
  });
};

// 重置form表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
  
<style lang="scss">
.login {
  display: flex;
  // 垂直，水平居中
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
  height: 100%;
}

html,
body,
#app {
  height: 100%;
}

.login-cur {
  width: 500px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  box-shadow: 0px 0px 5px 1px rgb(0, 95, 234);

  li {
    margin-top: 20px;
    margin-bottom: 30px;
    text-align: center;
    display: block;
    font-weight: 700;
    font-size: 20px;
  }

  .demo-ruleForm {
    width: 80%;

    label {
      color: black;
      font-weight: 700;
    }
  }

  .login-btn {
    margin-top: 25px;
    margin-left: 45px;
  }

  .reset-btn {
    margin-top: 25px;
    margin-left: 80px;
  }
}
</style>