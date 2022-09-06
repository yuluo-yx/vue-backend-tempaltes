<template>
  <BM />
  <hr />
  <div>
    <el-col>
      <el-card class="userinfo" shadow="always">
        <!-- 用户信息展示 -->
        <el-col>
          <el-card class="userinfoshow" shadow="hover">
            <div class="userAvatar">
              <el-avatar :size="70" :src="defaultAvatar" />
            </div>
            &nbsp;&nbsp;&nbsp;
            <div class="userinfo-card">
              <el-descriptions class="margin-top" :column="3" border>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon>
                        <user />
                      </el-icon>
                      姓名
                    </div>
                  </template>
                  Admin
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon>
                        <Promotion />
                      </el-icon>
                      邮箱
                    </div>
                  </template>
                  123@aliyun.com
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon>
                        <tickets />
                      </el-icon>
                      标签
                    </div>
                  </template>
                  <el-tag>管理员</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon>
                        <Key />
                      </el-icon>
                      个性签名
                    </div>
                  </template>
                  我是root用户！
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-card>
        </el-col>

        <div class="edit">
          <!-- 用户信息编辑 -->
          <el-col>
            <el-card class="edit-userinfo" shadow="always">
              <span class="explain">基本资料</span>
              <br />
              <el-radio-group v-model="labelPosition" label="label position">
                <span style="color: rgb(96, 98, 102)">样式选择： </span>
                &nbsp;
                <el-radio-button label="left">左对齐</el-radio-button>
                <el-radio-button label="right">右对齐</el-radio-button>
                <el-radio-button label="top">顶部对齐</el-radio-button>
              </el-radio-group>
              <div style="margin: 20px" />
              <el-form
                ref="ruleEditFormRef"
                :rules="editRules"
                :label-position="labelPosition"
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
                class="editform"
              >
                <el-form-item label="邮箱" prop="email">
                  <el-input
                    v-model="formLabelAlign.email"
                    type="text"
                    autocomplete="off"
                  />
                </el-form-item>
                <br />
                <el-form-item label="个性签名" prop="signate">
                  <el-input
                    v-model="formLabelAlign.signate"
                    type="text"
                    autocomplete="off"
                    maxlength="15"
                    minlength="5"
                    show-word-limit
                  />
                </el-form-item>
                <br />
                <el-form-item label="真实姓名" prop="realname">
                  <el-input
                    v-model="formLabelAlign.realname"
                    type="text"
                    autocomplete="off"
                    maxlength="10"
                    minlength="2"
                  />
                </el-form-item>
                <br />
                <br />
                <el-form-item class="fucntionBtn">
                  <el-button
                    :disabled="submitEditBtn"
                    type="primary"
                    @click="submitEditForm(ruleEditFormRef)"
                    >提交</el-button
                  >
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <el-button
                    :disabled="resetEditBtnbool"
                    @click="resetEditForm(ruleEditFormRef)"
                    >重置</el-button
                  >
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>

          <!-- 修改密码 -->
          <el-col>
            <el-card class="edit-password" shadow="always">
              <span class="explain">修改密码</span>
              <br />
              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                label-width="120px"
                class="edit-password-ruleForm"
              >
                <el-form-item label="原密码" prop="ordPassword">
                  <el-input
                    v-model="ruleForm.ordPassword"
                    autocomplete="off"
                    type="password"
                    show-password
                  />
                </el-form-item>
                <br />
                <el-form-item label="新密码" prop="pass">
                  <el-input
                    v-model="ruleForm.pass"
                    type="password"
                    autocomplete="off"
                    show-password
                  />
                </el-form-item>
                <br />
                <el-form-item label="重复输入" prop="checkPass">
                  <el-input
                    v-model="ruleForm.checkPass"
                    type="password"
                    autocomplete="off"
                    show-password
                  />
                </el-form-item>
                <br />
                <br />
                <el-form-item class="fucntionBtn">
                  <el-button
                    :disabled="functionBtnBool"
                    type="primary"
                    @click="submitForm(ruleFormRef)"
                    >提交</el-button
                  >
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <el-button
                    :disabled="submitEditBtnBool"
                    @click="resetForm(ruleFormRef)"
                    >重置</el-button
                  >
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script lang="ts" setup>
import { User, Tickets, Key, Promotion } from "@element-plus/icons-vue";
import defaultAvatar from "../../assets/blog.jpg";
import BM from "../../components/BackMenu.vue";
import { watch, computed, reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import * as ck from "../../util/verfifcation.js";
import * as loginApi from "../../api/login/login.js";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

let router = useRouter();

/**
 * 用户信息编辑
 */
const ruleEditFormRef = ref<FormInstance>();
const labelPosition = ref("right");
// 表单数据
const formLabelAlign = reactive({
  email: "123@aliyun.com",
  signate: "我是root用户！",
  realname: "Admin",
});

// 监听提交和重置数据，数据发生变化时再启用
let submitEditBtn = ref(true);
// 数据监听
watch(formLabelAlign, (newValue, oldValue) => {
  // 登录时的处理
  if (
    newValue.email != "123@aliyun.com" ||
    newValue.signate != "我是root用户！" ||
    newValue.realname != "Admin"
  ) {
    submitEditBtn.value = false;
  } else {
    submitEditBtn.value = true;
  }
});

let resetEditBtnbool = ref(true);
watch(formLabelAlign, (newValue, oldValue) => {
  if (
    newValue.email != "123@aliyun.com" ||
    newValue.signate != "我是root用户！" ||
    newValue.realname != "Admin"
  ) {
    resetEditBtnbool.value = false;
  } else {
    resetEditBtnbool.value = true;
  }
});

// 邮箱格式校验
const checkEmail = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("邮箱不能为空！！！"));
  } else if (ck.CkEmail(value)) {
    callback(new Error("邮箱格式不正确！！！"));
  } else {
    callback();
  }
};

// 数据格式检验
const editRules = reactive({
  email: [{ validator: checkEmail, trigger: "blur" }],
});

// 提交form表单，更改数据
const submitEditForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 发送修改请求
      loginApi
        .updateUserInfo({
          email: formLabelAlign.email,
          signate: formLabelAlign.signate,
          realname: formLabelAlign.realname,
        })
        .then((result: any) => {
          if (result.status === 200) {
            if (result.data.code == 8291) {
              ElMessage.success("登录成功！");
              console.log(result);
              // 数据更新请求发送成功之后更新数据
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
const resetEditForm = (formEl: FormInstance | undefined) => {
  // console.log(formEl);

  if (!formEl) return;
  formEl.resetFields();
};

/**
 * 修改用户密码
 */
const ruleFormRef = ref<FormInstance>();

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入新密码"));
  } else if (ck.CkPassword(value)) {
    callback(new Error("新密码格式错误，密码格式为6-15位的字母+数字"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请重复输入新密码"));
  } else if (value !== ruleForm.pass) {
    callback(new Error("第二次输入的密码和新密码不同！"));
  } else {
    callback();
  }
};

const checkordPassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入原密码！"));
  } else if (ck.CkPassword(value)) {
    callback(new Error("原密码格式错误！"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  ordPassword: "",
  pass: "",
  checkPass: ""
});

// 数据监听
let functionBtnBool = ref(true);
watch(ruleForm, (newValue, oldValue) => {
  if (
    newValue.pass != "" &&
    newValue.checkPass != "" &&
    newValue.ordPassword != ""
  ) {
    functionBtnBool.value = false;
  } else {
    functionBtnBool.value = true;
  }
});
let submitEditBtnBool = ref(true)
watch(ruleForm, (newValue, oldValue) => {
    if (
    newValue.pass != "" ||
    newValue.checkPass != "" ||
    newValue.ordPassword != ""
  ) {
    submitEditBtnBool.value = false;
  } else {
    submitEditBtnBool.value = true;
  }
})

const rules = reactive({
  ordPassword: [{validator: checkordPassword, trigger: "blur"}],
  pass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // console.log('登录!')
      loginApi
        .updateUserInfo({ password: ruleForm.pass })
        .then((result: any) => {
          // console.log(result);

          if (result.status === 200) {
            if (result.data.code == 8291) {
              ElMessage.success("密码修改成功，请重新登录！");

              // 移除token 调用注销方法
              loginApi.logoutUser();

              // 跳转到登录页
              router.push("/login");
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

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.userinfo {
  height: 80.5vh;
  background-color: #fff;
}

.userinfoshow {
  display: flex;
  height: 20vh;
  justify-content: space-evenly;
  align-items: center;

  .userAvatar {
    float: left;
    display: flex;
  }

  .userinfo-card {
    display: flex;
    float: right;
    margin-top: -20px;
  }
}

.fucntionBtn {
  margin-left: 70px;
}

.edit {
  width: 40vw;
  margin-top: 30px;
  margin-left: 60px;
  display: flex;

  .edit-userinfo {
    width: 35vw;
    height: 50vh;
  }

  .edit-password {
    width: 35vw;
    height: 50vh;
  }

  .explain {
    display: block;
    text-align: center;
    font-size: 18px;
    color: rgb(64, 158, 255);
  }
}

.editform {
  width: 80%;
}

.edit-password-ruleForm {
  width: 80%;
}

.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>