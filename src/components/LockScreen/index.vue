<template>
  <transition mode="out-in" name="fade-transform">
    <div v-if="Lock.isLock" class="yg-scren-lock">
      <div class="yg-scren-lock-content">
        
        <div class="yg-scren-lock-content-title">
          {{ userinfo.realname }} 屏幕已锁定 {{ hour }}:{{ minute }}:{{ second.toString().padStart(2, "0") }}
        </div>
        <!-- 
          {{ hour }}:{{ minute }}:{{
            second.toString().padStart(2, "0")
          }}
         -->
        <div class="yg-scren-lock-content-form">
          <el-form :model="form" @submit.prevent>
            <el-form-item label="" :label-width="0" prop="password">
              <el-input
                v-model="form.password"
                autocomplete="off"
                placeholder="请输入解锁密码"
                type="password"
              >
                <template #suffix>
                  <el-button
                    native-type="submit"
                    type="primary"
                    @click="handleUnLock"
                  >
                    解锁
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <span @click="handleLogOut">重新登陆</span>
        <div class="yg-scren-lock-content-bottom-title">
          <div>{{ copyright }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import type { LockInfo } from "#/store";
import { defineComponent, computed, watch, ref, unref, reactive } from "vue";
import { useLockStore } from "@/store/modules/lock";
import { useUserStore } from "@/store/modules/user";
import { useNow } from "./useNow";
import { tsExternalModuleReference } from "@babel/types";
var { appVersion, copyright } = require("@/config");

export default defineComponent({
  name: "LockScreen",
  components: {},
  inheritAttrs: false,
  props: {
    Lock: { type: Boolean, default: false },
    content: { type: String },
  },
  setup(props, { slots, attrs }) {
    const LockStore = useLockStore();
    const Lock = reactive(LockStore.getLockInfo);

    const userStore = useUserStore();
    const userinfo = reactive(userStore.getUserInfo);
    const { hour, month, minute, second, meridiem, year, day, week } =
      useNow(true);

    const form = ref({ password: "" });
    const lockUserName = ref("");

    /**
     * 解锁
     */
    const handleUnLock = () => {
      LockStore.unLock(form.value.password).then((res) => {
        form.value.password = "";
        //console.log("------form.value.password-------",res);
        if (res) {
          Lock.isLock = false;
        } else {
          Lock.isLock = true;
        }
      });
    };

    /**
     * 重新登陆
     */
    const handleLogOut = () => {
      LockStore.resetLockInfo();
      userStore.logout(true);
      //console.log("handleLogOut");
    };

    // watch(lockStatus,(newValue,oldValue)=>{
    //   if(newValue){
    //     //isLock = true;
    //     console.log("watch 已经触发",newValue.isLock)
    //   }
    // })

    return {
      form,
      handleLogOut,
      handleUnLock,
      Lock,
      userinfo,
      hour,
      month,
      minute,
      second,
      meridiem,
      year,
      day,
      week,
      copyright,
    };
  },
});
</script>
<style lang="less" scoped>
.yg-scren-lock {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1999; //$base-z-index;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s,
    color 0.1s, font-size 0s;
  backdrop-filter: blur(10px);

  &-background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    //z-index: $base-z-index - 1;
  }
  &-content {
    z-index: 1999;
    color: @text-color;
    text-align: center;

    > span {
      font-size: 12px;
      cursor: pointer;
    }

    &-title {
      line-height: 40px;
      color: @text-color;
      text-align: center;
      font-size: 14px;
      .el-icon-lock,
      .el-icon-unlock {
        display: block;
        margin: auto !important;
        font-size: 40px;
        color: @text-color;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s,
          color 0.1s, font-size 0s;
      }
    }

    &-form {
      :deep(.el-form-item) {
        .el-input__inner {
          width: 280px;
          // height: 40px;
          // line-height: 40px;
        }

        .el-input__suffix {
          right: 0;

          .el-button {
            // height: 40px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      }
    }
    &-bottom-title {
      font-size: 12px;
      color: #909399;
      text-align: center;
      position: absolute;
      bottom: 20px;
      //  left: 42.5%;
    }
  }
}
</style>
