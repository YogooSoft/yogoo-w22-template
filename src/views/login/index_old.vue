<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">悦高 W22 低代码应用开发平台</h3>
        <!-- <lang-select class="set-language" /> -->
      </div>

      <el-form-item prop="username">
        <!-- <span class="svg-container">
          <svg-icon icon-name="user" />
        </span> -->
        <el-input
          v-model="loginForm.username"
          :placeholder="login_username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
          prefix-icon="user"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <!-- <span class="svg-container">
            <svg-icon icon-name="password" />
          </span> -->
          <el-input
            :key="passwordType"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="login_password"
            :show-password="true"
            name="password"
            tabindex="2"
            autocomplete="on"
            prefix-icon="lock"
          />
        </el-form-item>
      </el-tooltip>
      <div class="op">
        <el-button
          :loading="loading"
          type="primary"
          style="width: 40%; margin-bottom: 30px"
          @click="Login"
        >
          登录
        </el-button>
      </div>

      <div style="position: relative">
        <div class="tips">
          <span style="margin-right: 18px"> 用户名 : admin</span>
          <span> 密码 : admin</span>
        </div>
        <div>{{ getTitle }}</div>
        <el-button class="thirdparty-button" type="primary">
          第三方登陆
        </el-button>
      </div>
    </el-form>
    <div class="bottom-title">
      <div>{{ copyright }} {{ "版本号：" + version }}</div>
    </div>
  </div>
</template>
<script lang="ts">
var { appVersion } = require("@/config");

import { defineComponent, computed, ref, toRaw } from "vue";

import { useRootSetting } from "@/hooks/setting/useRootSetting";
import { message } from "@/hooks/web/useMessage";
import { useRouter } from "vue-router";
import { Persistent } from "@/utils/cache/persistent";
import { TOKEN_KEY } from "@/enums/cacheEnum";
import { useUserStore } from "@/store/modules/user";
var { appVersion, copyright } = require("@/config");

export interface ILogin {
  username: string;
  password: string;
}

export default defineComponent({
  name: "Login",
  components: {},
  // props:["username","password","showPassword"],
  setup(props) {
    const version = appVersion;
    const loginForm = ref({
      username: "admin",
      password: "111111",
    });
    const { getTitle } = useRootSetting();
    const router = useRouter();
    const userStore = useUserStore();

    async function Login() {
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
    }

    // 字符串去重复
    return {
      version,
      input_text: "",
      loginForm,
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      login_username: "用户名",
      login_password: "密码",
      getTitle,
      Login,
      copyright,
    };
  },
});
</script>
<!-- <style lang="less" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

// @bg: #283443;
// @light_gray: #fff;
// @cursor: #fff;

@bg: #151515;
@light_gray: #fff;
@cursor: #fff;


@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container .el-input input {
    color: @cursor;
  }
}

/* reset element-ui css */
.login-container {
  :deep(.el-input) {
    display: inline-block;
    height: 47px;
    width: 85%;
    border: 0px;

    input {
      background: transparent;
      border: 0px;
      // -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: @light_gray;
      height: 47px;
      caret-color: @cursor;
      box-shadow: 0 0 0 0px @bg inset !important;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px @bg inset !important;
        -webkit-text-fill-color: @cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style> -->

<style lang="less" scoped>
// @bg: #2d3a4b;
@bg: #212121;
@dark_gray: #889aa4;
@light_gray: #eee;
@cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;

  .input {
    color: @light_gray;
  }
  .login-form {
    position: relative;
    width: 420px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .op {
    display: flex;
    justify-content: center;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    // vertical-align: middle;
    width: 30px;
    // height: 100%;
    display: inline-block;
    align-items: center;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .bottom-title {
    font-size: 12px;
    color: #909399;
    text-align: center;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: 0 auto;
    //  left: 42.5%;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
