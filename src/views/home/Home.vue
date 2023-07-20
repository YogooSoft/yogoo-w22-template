<template>
  <div class="layout">
    <!-- <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <div><span>访问数</span></div>
          <div>
            <span><el-tag size="small">周</el-tag></span>
          </div>
        </div>
      </template>
    </el-card>
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
    </el-card>
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
        </div>
      </template>
    </el-card> -->
    <el-card class="box-card view-home" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>全站流量</span>
        </div>
      </template>
      <div class="card"><count-flow /></div>
    </el-card>
    <el-card class="box-card view-home" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>全站日活</span>
        </div>
      </template>
      <div class="card">
        <count-daily />
      </div>
    </el-card>
    <el-card class="box-card view-home" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>注册用户数</span>
        </div>
      </template>
      <div class="card">
        <count-regusers />
      </div>
    </el-card>
    <el-card class="box-card view-home" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>下单人数</span>
        </div>
      </template>
      <div class="card">
        <count-sales />
      </div>
    </el-card>
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { defineComponent, computed, ref, reactive } from "vue";

import CountSales from "./components/count-sales.vue";
import CountFlow from "./components/count-flow.vue";
import CountDaily from "./components/count-daily.vue";
import CountRegusers from "./components/count-regusers.vue";

export default defineComponent({
  name: "LockModal",
  components: { CountSales, CountFlow, CountDaily, CountRegusers },
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
<style lang="less" scoped>
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
  align-items: center;
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

.view-home {
  .card {
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #000;

    &__header {
      display: flex;
      align-items: center;
      height: 30px;
      padding: 0 0px;

      .label {
        font-size: 12px;
      }

      .value {
        font-size: 18px;
        font-weight: bold;
        margin-left: 10px;
      }
    }

    // &__container {
    //   padding: 0 10px;
    //   height: 30px;
    // }

    // &__footer {
    //   display: flex;
    //   align-items: center;
    //   height: 30px;
    //   border-top: 1px solid #f7f7f7;
    //   font-size: 12px;
    //   margin: 0 5px;
    //   padding: 0 5px;
    //   box-sizing: border-box;

    //   .label {
    //     margin-right: 10px;
    //   }

    //   .value {
    //     font-size: 13px;
    //   }
    // }
  }
}
</style>
