<template>
  <page-wrapper title="操作权限示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="操作权限示例"
      :can-expan="true"
      help-message="操作权限示例，点击切换按钮后请查看按钮变化。"
    >
      <el-alert :title="msg" type="info" style="margin-bottom: 10px" show-icon :closable="false"  />
      <div class="flex-1">
        <span>
          <el-button type="primary" :plain="true" @click="change_role('role1')"
            >点击切换角色01权限</el-button
          >
            <el-button type="primary" :plain="true" @click="change_role('role2')"
            >点击切换角色02权限</el-button
          >
        </span>
      </div>
      <div class="flex-1" style="margin-top: 10px">
        <el-button v-if="hasPermission('1000')" type="success">拥有code[1000]的角色可见</el-button>
        <el-button v-if="hasPermission('2000')" type="info">拥有code[2000]的角色可见</el-button>
        <el-button v-if="hasPermission('3000')" type="warning">拥有code[3000]的角色可见</el-button>
        <el-button v-if="hasPermission('4000')" type="danger">拥有code[4000]的角色可见</el-button>


      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, toRaw, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { api_sessionTimeout } from "@/api/user";
import {getPermCode} from '@/api/user';

export default defineComponent({
  name: "session-timeout",
  components: { CollapseContainer, PageWrapper },

  data() {
    return {
      allCodeList: new Array<any>(), // 权限列表
      msg:"操作权限示例，点击切换按钮后请查看按钮变化。角色01 code:['1000', '2000', '3000','4000'] ；  角色02 code:['1000','2000']"
    };
  },

  beforeCreate() {
    // 获取当前菜单的操作权限列表

    var data = toRaw({
      userid: 'role1',
      menu_id: '80010100',
    });
    getPermCode(data).then((res) => {
      this.allCodeList = res["data"];
    });
  },

  methods: {
    hasPermission(value) {
      // 判断是否有权限
      return this.allCodeList.includes(value)
    },

    change_role(userid){
      var data = toRaw({
        userid: userid,
        menu_id: '80010100',
      });

      getPermCode(data).then((res) => {
        this.allCodeList = res["data"];
      });

    },

  },
  mounted() {

  },

  setup(props) {
    async function sessionTimeout() {
      const res = await api_sessionTimeout();
      console.log(res);
    }

    return {
      sessionTimeout
    };
  },
});
</script>

<style lang="less" scoped>
  .flex-1 {
    flex: 1;
  }

  .flex-2 {
    margin-bottom: 10px;
  }

  .cl-mb-10 {
    margin-bottom: 10px;
  }

  .cl-mb-10-top {
    margin-top: 10px;
  }

  .el-alert {
    margin-bottom: 10px;
  }
</style>
