<template>
  <div class="page-login">
    <div class="box">
      <div class="logo">
        <img src="@/assets/images/logo-mini@2x.png" alt="Logo" />
        <span>{{ appTitle }}</span>
      </div>
      <p class="desc">一款快速开发后台权限管理系统</p>

      <el-form label-position="top" class="form" :disabled="saving">
        <el-form-item label="用户名">
          <input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            maxlength="20"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item label="密码">
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            maxlength="20"
            autocomplete="off"
          />
        </el-form-item>

        <!-- <el-form-item label="验证码">
          <div class="row">
            <input
              v-model="form.verifyCode"
              placeholder="图片验证码"
              maxlength="4"
              @keyup.enter="toLogin"
            />

            <captcha
              :ref="setRefs('captcha')"
              v-model="form.captchaId"
              @change="
                () => {
                  form.verifyCode = '';
                }
              "
            />
          </div>
        </el-form-item> -->

        <div class="op">
          <el-button :loading="saving" @click="toLogin">登录</el-button>
        </div>
      </el-form>
      <div class="bottom-copyright">
        <div>{{ copyright }} {{ "版本号：" + version }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRaw } from "vue";
import { useRootSetting } from "@/hooks/setting/useRootSetting";
import { message } from "@/hooks/web/useMessage";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
var { appVersion, copyright, loginPageTitle } = require("@/config");

export interface ILogin {
  username: string;
  password: string;
}

export default defineComponent({
  name: "Login",
  components: {},
  setup(props) {
    const version = appVersion;

    const loginForm = ref({
      username: "admin",
      password: "111111",
    });

    const { getTitle, getLoginPageTitle } = useRootSetting();
    const router = useRouter();
    const userStore = useUserStore();
    const appTitle = getLoginPageTitle;

    // 状态1
    const saving = ref(false);

    async function toLogin() {
      if (!loginForm.value.username) {
        return message.error("用户名不能为空");
      }

      if (!loginForm.value.password) {
        return message.error("密码不能为空");
      }

      saving.value = true;

      try {
        const userInfo = await userStore
          .login(
            toRaw({
              password: loginForm.value.password,
              username: loginForm.value.username,
            })
          )
          .then((res: any) => {
            //console.log("-------login----------",res);
            router.push("/");
          })
          .catch(() => {});
        // 重点***，如果这里少了catch这一步，就会报警告
      } catch (err: any) {
        // refs.captcha.refresh();
        message.error(err.message);
      }

      saving.value = false;
    }

    return {
      saving,
      appTitle,
      version,
      loginForm,
      getTitle,
      toLogin,
      copyright,
    };
  },
});
</script>

<style lang="less" scoped>
.page-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #212121;
  //   #2f3447;
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .logo {
      height: 50px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      color: #fff;

      img {
        height: 30px;
      }

      span {
        font-size: 24px;
        margin-left: 10px;
        letter-spacing: 5px;
        // font-weight: bold;
      }
    }

    .desc {
      color: #eee;
      font-size: 14px;
      letter-spacing: 1px;
      margin-bottom: 50px;
    }

    .el-form {
      width: 300px;

      :deep(.el-form-item) {
        margin-bottom: 20px;

        .el-form-item__label {
          color: #ccc;
        }
      }

      input {
        background-color: transparent;
        color: #fff;
        border: 0;
        height: 40px;
        width: calc(100% - 4px);
        margin: 0 2px;
        padding: 0 2px;
        box-sizing: border-box;
        -webkit-text-fill-color: #fff;
        font-size: 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 0;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px transparent inset !important;
          transition: background-color 50000s ease-in-out 0s;
        }

        &::-webkit-input-placeholder {
          font-size: 12px;
        }

        &:focus {
          outline: none; //fix: 修复样式兼容
          border-color: #fff;
        }
      }

      .row {
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;

        .captcha {
          position: absolute;
          right: 0;
          bottom: 1px;
        }
      }
    }

    .op {
      display: flex;
      justify-content: center;
      margin-top: 40px;

      :deep(.el-button) {
        height: 30px;
        width: 120px;
        font-size: 15px;
      }
    }

    .bottom-copyright {
      font-size: 12px;
      color: #909399;
      text-align: center;
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
}
</style>
