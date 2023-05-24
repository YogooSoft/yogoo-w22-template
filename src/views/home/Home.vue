<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div> -->
  <!-- <el-input v-model="input_text.user" placeholder="Please input" type = "text"  />
    <el-input v-model="input" placeholder="Please input" type = "text"  /> -->
  <div class="layout">
  <!-- <div> -->
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <div><span>访问数</span></div>
        <div><span><el-tag size="small">周</el-tag></span></div>
        <!-- <span>访问数</span>
        <span><el-tag size="small">周</el-tag></span> -->
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ "List item " + o }}
    </div>
  </el-card>
  <!-- </div>
    <div> -->
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>成交额</span>
        <span><el-tag size="small" type="danger">月</el-tag></span>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ "List item " + o }}
    </div>
  </el-card>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>下载量</span>
        <span><el-tag size="small" type="warning">年</el-tag></span>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ "List item " + o }}
    </div>
  </el-card>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ "List item " + o }}
    </div>
  </el-card>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ "List item " + o }}
    </div>
  </el-card>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ "List item " + o }}
    </div>
  </el-card>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ "List item " + o }}
    </div>
  </el-card>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ "List item " + o }}
    </div>
  </el-card>
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { defineComponent, computed, ref, reactive } from "vue";


// export function createFakeUserList() {
//   return [
//     {
//       userId: "1",
//       username: "admin",
//       realname: "超级管理员",
//       avatar: "",
//       desc: "manager",
//       password: "123456",
//       token: "fakeToken1",
//       homePath: "/dashboard/analysis",
//       roles: [
//         {
//           roleName: "Super Admin",
//           value: "super",
//         },
//       ],
//     },
//     {
//       userId: "2",
//       username: "test",
//       password: "123456",
//       realname: "测试用户",
//       avatar: "",
//       desc: "tester",
//       token: "fakeToken2",
//       homePath: "/dashboard/workbench",
//       roles: [
//         {
//           roleName: "Tester",
//           value: "test",
//         },
//       ],
//     },
//   ];
// }

export default defineComponent({
  name: "LockModal",
  components: {},
  //export default defineComponent({
  setup() {
    const input = ref("");
    const input_text = reactive({ user: "" });

    return {
      input_text: { user: "1234" },
      input,
    };
  },
});
</script>
<style lang="less">
.el-card {
    --el-card-border-color: var(--el-border-color-light, #ebeef5);
    --el-card-border-radius: 4px;
    --el-card-padding: 8px;
    --el-card-bg-color: var(--el-fill-color-blank);
}
.el-card__header {
  height: 32px !important;
}
.el-card__body {
  padding: 10px 10px 0px 10px !important;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items:center;
  height: 20px !important;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 10px;
}

.box-card {
  width: 220px;
  margin: 0px 10px 10px 0px;
}

.layout {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;
  // border: 1px solid #000;
}

.box {
  /* 考虑到border 设置盒子模型 */
  // line-height: 50px;
  margin: 0px 5px 5px 0px;
  // width: calc((100% - 32px) / 3);
  // height: 100px;
  // background-color: rgb(5, 196, 187);
}
</style>

