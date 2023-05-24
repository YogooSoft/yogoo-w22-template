<template>
  <yui-drawer
    v-bind="$attrs"
    @register="register"
    title="Drawer Title"
    width="50%"
  >
    <template #default>
      <collapse-container
        class="cl-mb-10"
        :show-title="false"
        :can-expan="false"
        help-message="抽屉组件使用示例"
      >

        <div>
          <span>
            <ul>
              <li v-for="index in lines" :key="index">加载完成{{ index }}！</li>
            </ul>
          </span>
        </div>
      </collapse-container>
    </template>
    <template #footer>
      <div class="drawer-footer">
        <el-button type="primary" @click="">确定</el-button>
        <el-button @click="closeDrawer">关闭</el-button>
      </div>
    </template>
  </yui-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { CollapseContainer } from "@/components/Container/index";
import { YuiDrawer, useDrawerInner } from "@/components/Drawer";

export default defineComponent({
  components: { YuiDrawer, CollapseContainer },
  setup() {
    const [register, { closeDrawer }] = useDrawerInner();
    const lines = ref(75);
    const loading = ref(true);

    return { register, closeDrawer, lines, loading };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.drawer-footer {
  width: 100%;
  right: 10px;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 10px;
}
</style>
